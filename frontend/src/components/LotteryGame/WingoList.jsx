import React from "react";
import { cn } from "../../lib/utils";

const WingoList = () => {
  const wingoCategories = [
    { id: 1, name: "Win Go", time: "30s", isActive: true },
    { id: 2, name: "Win Go", time: "1Min", isActive: false },
    { id: 3, name: "Win Go", time: "3Min", isActive: false },
    { id: 4, name: "Win Go", time: "5Min", isActive: false },
  ];

  return (
    <div className="bg-card rounded-xl">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {wingoCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300",
              category.isActive ? "bg-active py-1.5" : "py-1.5"
            )}
          >
            <div className="w-12 h-12">
              <img
                src={`/images/${
                  category.isActive ? "active_min_clock" : "min_clock"
                }.png`}
                className="w-full"
                alt={category.name}
              />
            </div>
            <span
              className={cn(
                "text-sm font-normal block",
                category.isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {category.name}
            </span>
            <span
              className={cn(
                "text-sm block font-normal",
                category.isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {category.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WingoList;
