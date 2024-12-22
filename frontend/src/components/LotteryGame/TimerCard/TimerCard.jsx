import React, { useEffect, useState } from "react";
import { SiGoogledocs } from "react-icons/si";
import { cn } from "../../../lib/utils";

const TimerCard = ({ initialTime = 30 }) => {
  // Convert to countdown format (always 1 second less than total time)
  const getInitialCountdown = (time) => {
    return time >= 60 ? time - 1 : 29; // For 30s we start from 29, for minutes we subtract 1
  };

  const [timeRemaining, setTimeRemaining] = useState(
    getInitialCountdown(initialTime)
  );

  useEffect(() => {
    // Reset timer when initialTime changes
    setTimeRemaining(getInitialCountdown(initialTime));

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Reset to initial countdown when reaching 0
          return getInitialCountdown(initialTime);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  // Format time display in MM:SS format
  const formatTimeDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
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
            Win Go {initialTime >= 60 ? `${initialTime / 60}Min` : "30s"}
          </p>

          {/* Lottery Numbers */}
          <div className="flex gap-x-1">
            {[4, 4, 9, 6, 2].map((number, index) => (
              <div
                key={index}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-light text-sm
                  ${index === 2 ? "bg-green-500" : "bg-red-500"}`}
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
            {formatTimeDisplay(timeRemaining)
              .split("")
              .map((digit, index) => (
                <div
                  key={`time-${index}`}
                  className={cn(
                    "flex items-center justify-center bg-foreground text-info font-bold text-xl p-1.5",
                    // Make colon smaller and adjust alignment
                    digit === ":" ? "bg-foreground" : ""
                  )}
                >
                  {digit}
                </div>
              ))}
          </div>
          <p className="text-foreground text-base font-medium mt-2">
            202412221000610
          </p>
        </div>
      </div>
    </div>
  );
  s;
};

export default TimerCard;
