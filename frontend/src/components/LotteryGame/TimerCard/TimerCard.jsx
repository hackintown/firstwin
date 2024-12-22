import React from "react";
import { SiGoogledocs } from "react-icons/si";

const TimerCard = () => {
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
          <p className="text-white text-sm">Win Go 1Min</p>

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
            {/* Timer digits */}
            {["0", "0", ":", "1", "3"].map((digit, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-foreground text-info font-bold text-xl p-1.5"
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
