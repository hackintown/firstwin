import React, { useEffect, useState } from "react";
import { SiGoogledocs } from "react-icons/si";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { cn } from "../../../lib/utils";
import socketService from "../../../services/socketService";

// Memoized selectors
const selectActiveGameType = state => state.wingo.activeGameType;
const selectGames = state => state.wingo.games;

const selectActiveGameData = createSelector(
  [selectActiveGameType, selectGames],
  (activeGameType, games) => ({
    currentGame: games[activeGameType]?.currentGame || null,
    countdown: games[activeGameType]?.countdown || {
      value: null,
      showAnimation: false
    }
  })
);

const TimerCard = ({ initialTime = 30 }) => {
  const activeGameType = useSelector(selectActiveGameType);
  const { currentGame, countdown } = useSelector(selectActiveGameData);
  const [localCountdown, setLocalCountdown] = useState(countdown.value);

  useEffect(() => {
    if (!socketService.socket) {
      socketService.connect();
    }

    // Subscribe to WebSocket updates for the active game type
    socketService.subscribeToGame(activeGameType);

    return () => {
      // Unsubscribe when the component unmounts or game type changes
      socketService.unsubscribeFromGame(activeGameType);
    };
  }, [activeGameType]);

  useEffect(() => {
    setLocalCountdown(countdown.value);

    const timer = setInterval(() => {
      setLocalCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown.value]);

  const formatTime = (seconds) => {
    if (seconds === null || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div
      style={{ backgroundImage: "url('/images/wingo_timer_card.png')" }}
      className="bg-cover bg-center bg-no-repeat rounded-xl px-2 py-2"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="space-y-2">
          <button className="text-foreground px-6 py-1 border text-sm border-foreground rounded-full flex items-center gap-2">
            <SiGoogledocs className="text-xl" />
            How to play
          </button>
          <p className="text-white text-sm">
            Win Go {activeGameType === "30sec" ? "30s" :
              activeGameType === "1min" ? "1Min" :
                activeGameType === "3min" ? "3Min" : "5Min"}
          </p>

          {/* Lottery Numbers */}
          <div className="flex gap-x-1">
            {currentGame?.numbers?.map((number, index) => (
              <div
                key={index}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-white font-light text-sm",
                  currentGame?.colors?.[index] === "green"
                    ? "bg-green-500"
                    : currentGame?.colors?.[index] === "red"
                      ? "bg-red-500"
                      : "bg-purple-500"
                )}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Timer */}
        <div className="text-right">
          <p className="text-foreground mb-1.5">Time remaining</p>
          <div className="flex gap-1">
            {formatTime(localCountdown)
              .split("")
              .map((digit, index) => (
                <div
                  key={`time-${index}`}
                  className=
                  "flex items-center justify-center bg-foreground text-info font-bold text-xl p-1.5"

                >
                  {digit}
                </div>
              ))}
          </div>
          <p className="text-foreground text-base font-medium mt-2">
            {currentGame?.period || "Loading..."}
          </p>
        </div>
      </div>
      {/* Countdown Animation Overlay */}
      {countdown.showAnimation && localCountdown > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="text-8xl font-bold text-white animate-pulse">
            {localCountdown}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerCard;
