import { io } from "socket.io-client";
import store from "../app/store";
import {
    addGameHistory,
    setCurrentGame,
    setCountdown,
    setGameResult,
    updateGameState
} from "../features/wingoSlice";

class SocketService {
    constructor() {
        this.socket = null;
        this.activeGames = new Set();
        this.countdownAudio = new Audio('/sounds/countdown.mp3');
        this.resultAudio = new Audio('/sounds/result.mp3');

        // Preload audio for better performance
        this.countdownAudio.preload = "auto";
        this.resultAudio.preload = "auto";
    }

    connect() {
        if (!this.socket) {
            const socketUrl = import.meta.env.VITE_API_URL.replace("/api", "");
            console.log("Connecting to socket server:", socketUrl);

            this.socket = io(socketUrl, {
                transports: ["websocket", "polling"],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
                autoConnect: true,
                withCredentials: true,
                path: '/socket.io/',
                forceNew: true,
                rememberUpgrade: true
            });

            this.socket.on("connect", () => {
                console.log("Connected to WebSocket server:", this.socket.id);
                this.connected = true;

                // Resubscribe to active games after reconnection
                this.activeGames.forEach((gameType) =>
                    this.subscribeToGame(gameType)
                );
            });

            this.socket.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
                this.connected = false;

                // Retry with polling if websocket fails
                if (this.socket.io.opts.transports[0] === "websocket") {
                    console.log("Retrying with polling transport");
                    this.socket.io.opts.transports = ["polling", "websocket"];
                }
            });

            this.socket.on("reconnect_attempt", (attempt) => {
                console.log(`Reconnection attempt ${attempt}`);
            });

            this.socket.on("reconnect_failed", () => {
                console.error("Failed to reconnect to server");
                this.connected = false;
            });

            this.socket.on("disconnect", (reason) => {
                console.log("Disconnected from WebSocket server:", reason);
                this.connected = false;
            });

            this.setupGeneralEventListeners();
        }
        return this.socket;
    }


    setupGeneralEventListeners() {
        this.socket.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    }

    subscribeToGame(gameType) {
        if (!this.socket) {
            this.connect();
        }

        this.activeGames.add(gameType);

        this.socket.on(`game:${gameType}`, (data) => {
            switch (data.type) {
                case "newGame":
                    store.dispatch(setCurrentGame({ gameType, game: data.data }));
                    break;

                case "gameUpdate":
                    store.dispatch(updateGameState({ gameType, state: data.data }));
                    break;

                case "countdown":
                    const countdown = data.data.timeRemaining;
                    store.dispatch(setCountdown({ gameType, countdown, showAnimation: countdown <= 5 }));

                    if (countdown <= 5 && countdown > 0) {
                        this.playCountdownSound();
                    }
                    break;

                case "result":
                    this.playResultSound();
                    store.dispatch(
                        setGameResult({
                            gameType,
                            result: data.data.result,
                            period: data.data.period,
                        })
                    );
                    store.dispatch(
                        addGameHistory({
                            gameType,
                            history: data.data,
                        })
                    );
                    break;
                default:
                    console.warn(`Unknown event type for ${gameType}:`, data.type);
            }
        });

        // Request initial game state
        this.socket.emit('joinGame', { gameType });
    }

    unsubscribeFromGame(gameType) {
        if (this.socket) {
            this.activeGames.delete(gameType);
            this.socket.off(`game:${gameType}`);
            this.socket.emit('leaveGame', { gameType });
        }
    }

    // Place a bet
    placeBet(gameType, betData) {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error('Socket not connected'));
                return;
            }

            this.socket.emit('placeBet', {
                gameType,
                ...betData
            }, (response) => {
                if (response.success) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    // Request game history
    getGameHistory(gameType, limit = 10) {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error('Socket not connected'));
                return;
            }

            this.socket.emit('getGameHistory', {
                gameType,
                limit
            }, (response) => {
                if (response.success) {
                    store.dispatch(addGameHistory({
                        gameType,
                        history: response.data
                    }));
                    resolve(response.data);
                } else {
                    reject(new Error(response.message));
                }
            });
        });
    }

    playCountdownSound() {
        this.countdownAudio.currentTime = 0;
        this.countdownAudio.play().catch(error =>
            console.log('Countdown sound play error:', error)
        );
    }

    playResultSound() {
        this.resultAudio.currentTime = 0;
        this.resultAudio.play().catch(error =>
            console.log('Result sound play error:', error)
        );
    }

    disconnect() {
        if (this.socket) {
            this.activeGames.clear();
            this.socket.disconnect();
            this.socket = null;
            console.log("Disconnected from WebSocket server");
        }
    }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
