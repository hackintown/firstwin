import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB, { disconnectDB } from "./config/db.js";
import WingoGame from "./models/WingoGame.js";
import { startGameLoop } from "./controllers/wingoController.js";

dotenv.config();

const server = createServer(app);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Configure CORS for Express
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Configure Socket.IO
const io = new Server(server, {
  pingTimeout: 60000,
  pingInterval: 25000,
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000", "https://firstwin.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  allowEIO3: true,
  transports: ["websocket", "polling"],
});

// Socket.IO Event Handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle bet placement
  socket.on("placeBet", async (data, callback) => {
    try {
      // Add your bet placement logic here
      const result = { success: true, data: { /* bet details */ } };
      callback(result);
    } catch (error) {
      callback({ success: false, message: error.message });
    }
  });

  // Handle game history requests
  socket.on("getGameHistory", async ({ gameType, limit }, callback) => {
    try {
      const history = await WingoGame.find({ gameType })
        .sort({ endTime: -1 })
        .limit(limit);
      callback({ success: true, data: history });
    } catch (error) {
      callback({ success: false, message: error.message });
    }
  });

  // Handle joining game rooms
  socket.on("joinGame", ({ gameType }) => {
    socket.join(`game:${gameType}`);
    console.log(`Client ${socket.id} joined game: ${gameType}`);
  });

  // Handle leaving game rooms
  socket.on("leaveGame", ({ gameType }) => {
    socket.leave(`game:${gameType}`);
    console.log(`Client ${socket.id} left game: ${gameType}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});


// Start the game loop with Socket.IO instance
startGameLoop(io);

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});


// Graceful Shutdown
const gracefulShutdown = async (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => console.log("HTTP server closed"));
  await disconnectDB();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
