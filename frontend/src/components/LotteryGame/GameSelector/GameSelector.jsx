import React, { useState } from "react";
import { useDispatch } from "react-redux";
import socketService from "../../../services/socketService";

const GameSelector = ({ gameType, currentGame }) => {
  const dispatch = useDispatch();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(0);

  const numbers = Array.from({ length: 10 }, (_, i) => ({
    number: String(i),
    image: `/images/n${i}.png`
  }));

  const multipliers = [1, 5, 10, 20, 50, 100];

  const handlePlaceBet = async (type, value) => {
    if (!currentGame) return;

    try {
      await socketService.placeBet(gameType, {
        type, // 'number', 'color', or 'size'
        value, // number, 'red'/'green'/'violet', or 'big'/'small'
        amount: betAmount,
        multiplier: selectedMultiplier,
        period: currentGame.period
      });
      
      // Reset selections after successful bet
      setSelectedNumber(null);
      setBetAmount(0);
    } catch (error) {
      console.error('Bet placement failed:', error);
      // Handle error (show toast notification etc.)
    }
  };

  const handleRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 10);
    setSelectedNumber(String(randomNum));
  };

  return (
    <div className="bg-card rounded-lg p-2 space-y-3">
      {/* Color Selection Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => handlePlaceBet('color', 'green')}
          className="flex-1 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Green
        </button>
        <button 
          onClick={() => handlePlaceBet('color', 'violet')}
          className="flex-1 py-2 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600"
        >
          Violet
        </button>
        <button 
          onClick={() => handlePlaceBet('color', 'red')}
          className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Red
        </button>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-5 gap-2 p-2 bg-background rounded-lg">
        {numbers.map((item) => (
          <div
            key={item.number}
            onClick={() => {
              setSelectedNumber(item.number);
              handlePlaceBet('number', item.number);
            }}
            className={`aspect-square cursor-pointer ${
              selectedNumber === item.number ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={item.image}
              alt={`Number ${item.number}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Multiplier and Random Buttons */}
      <div className="flex flex-wrap gap-1.5 justify-between">
        <button 
          onClick={handleRandomNumber}
          className="px-1.5 py-1.5 text-secondary text-sm border border-secondary rounded-md hover:bg-secondary/30"
        >
          Random
        </button>
        {multipliers.map((multiplier) => (
          <button
            key={multiplier}
            onClick={() => setSelectedMultiplier(multiplier)}
            className={`px-2 py-1 ${
              multiplier === selectedMultiplier ? "bg-primary" : "bg-gray-800"
            } text-white rounded-lg hover:opacity-90 text-sm`}
          >
            X{multiplier}
          </button>
        ))}
      </div>

      {/* Big/Small Selector */}
      <div className="flex rounded-full overflow-hidden">
        <button 
          onClick={() => handlePlaceBet('size', 'big')}
          className="flex-1 py-2.5 font-medium bg-primary text-primary-foreground"
        >
          Big
        </button>
        <button 
          onClick={() => handlePlaceBet('size', 'small')}
          className="flex-1 py-2.5 font-medium bg-info text-info-foreground"
        >
          Small
        </button>
      </div>

      {/* Bet Amount Input */}
      <div className="flex gap-2">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="flex-1 px-3 py-2 bg-background rounded-md"
          placeholder="Enter bet amount"
        />
      </div>
    </div>
  );
};

export default GameSelector;
