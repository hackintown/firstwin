import React from "react";

const GameSelector = () => {
  const numbers = [
    { number: "0", image: "/images/n0.png" },
    { number: "1", image: "/images/n1.png" },
    { number: "2", image: "/images/n2.png" },
    { number: "3", image: "/images/n3.png" },
    { number: "4", image: "/images/n4.png" },
    { number: "5", image: "/images/n5.png" },
    { number: "6", image: "/images/n6.png" },
    { number: "7", image: "/images/n7.png" },
    { number: "8", image: "/images/n8.png" },
    { number: "9", image: "/images/n9.png" },
  ];
  const multipliers = [1, 5, 10, 20, 50, 100];

  return (
    <div className="bg-card rounded-lg p-2 space-y-3">
      {/* Color Selection Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
          Green
        </button>
        <button className="flex-1 py-2 px-4 bg-violet-500 text-white rounded-md hover:bg-violet-600">
          Violet
        </button>
        <button className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
          Red
        </button>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-5 gap-2 p-2 bg-background rounded-lg">
        {numbers.map((item) => (
          <div
            key={item.number}
            className="aspect-square flex items-center justify-center text-2xl font-bold text-white"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center">
              <img
                src={item.image}
                alt={`Number ${item.number}`}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Multiplier Buttons */}
      <div className="flex flex-wrap gap-1.5 justify-between">
        <button className="px-1.5 py-1.5 text-secondary text-sm border border-secondary rounded-md hover:bg-secondary/30">
          Random
        </button>
        {multipliers.map((multiplier) => (
          <button
            key={multiplier}
            className={`px-2 py-1 ${
              multiplier === 1 ? "bg-primary" : "bg-gray-800"
            } text-white rounded-lg hover:opacity-90 text-sm`}
          >
            X{multiplier}
          </button>
        ))}
      </div>

      {/* Big/Small Selector */}
      <div className="flex rounded-full overflow-hidden">
        <button className="flex-1 py-2.5 font-medium bg-primary text-primary-foreground">
          Big
        </button>
        <button className="flex-1 py-2.5 font-medium bg-info text-info-foreground">
          Small
        </button>
      </div>
    </div>
  );
};

export default GameSelector;
