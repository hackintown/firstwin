import React, { useState } from "react";
import { cn } from "../../lib/utils";

const WingoList = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(30);
  const wingoCategories = [
    { id: 1, name: "Win Go", time: 30, isActive: activeTab === 30 },
    { id: 2, name: "Win Go", time: 60, isActive: activeTab === 60 },
    { id: 3, name: "Win Go", time: 180, isActive: activeTab === 180 },
    { id: 4, name: "Win Go", time: 300, isActive: activeTab === 300 },
  ];

  const handleTabClick = (time) => {
    setActiveTab(time);
    onTabChange(time);
  };

  return (
    <div className="bg-card rounded-xl">
      <div className="grid grid-cols-4">
        {wingoCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "relative flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300",
              category.isActive ? "bg-active py-1.5" : "py-1.5"
            )}
            onClick={() => handleTabClick(category.time)}
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
              {category.time === 30 ? "30s" : `${category.time / 60}Min`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WingoList;
