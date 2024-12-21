import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GAME_TYPES } from "./winner-info";

const Winner = React.memo(({ winner, index }) => {
  const gameStyle = GAME_TYPES[winner.game];

  return (
    <motion.div
      key={winner.name + index}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50, position: "absolute", width: "100%" }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      layout
      className="bg-card backdrop-blur-sm border border-border rounded-lg p-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={winner.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-border"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">
              {winner.name}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={`px-2 py-0.5 rounded text-xs ${gameStyle.bgColor} ${gameStyle.borderColor} border`}
              >
                {winner.game}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-green-400 font-semibold">₹{winner.amount}</span>
          <span className="text-gray-400 text-xs">Winning amount</span>
        </div>
      </div>
    </motion.div>
  );
});

const WinningInfo = () => {
  const generateRandomWinner = useCallback(() => {
    const games = Object.keys(GAME_TYPES);
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const randomAmount = Math.floor(1000 + Math.random() * 9000).toFixed(2);

    return {
      name: `Mem****${randomDigits}`,
      amount: randomAmount,
      game: randomGame,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomDigits}`,
    };
  }, []);

  const [winners, setWinners] = useState(() =>
    Array.from({ length: 5 }, generateRandomWinner)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWinners((prev) => [generateRandomWinner(), ...prev.slice(0, -1)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [generateRandomWinner]);

  const headerSection = useMemo(
    () => (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h2 className="text-lg font-semibold text-white">
          Winning information
        </h2>
      </div>
    ),
    []
  );

  return (
    <div className="rounded-xl">
      {headerSection}
      <motion.div className="space-y-3 relative" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {winners.map((winner, index) => (
            <Winner
              key={winner.name + "-" + index}
              winner={winner}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default React.memo(WinningInfo);
