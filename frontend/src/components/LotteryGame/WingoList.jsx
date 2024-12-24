import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveGameType } from "../../features/wingoSlice";

const WingoList = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState(30);
  const dispatch = useDispatch();

  // Slot categories for different game intervals
  const wingoCategories = [
    {
      id: 1,
      name: "Win Go",
      time: 30,
      period: "30s",
      isActive: activeTab === 30,
      icon: {
        active: "/images/active_min_clock.png",
        default: "/images/min_clock.png",
      },
    },
    {
      id: 2,
      name: "Win Go",
      time: 60,
      period: "1Min",
      isActive: activeTab === 60,
      icon: {
        active: "/images/active_min_clock.png",
        default: "/images/min_clock.png",
      },
    },
    {
      id: 3,
      name: "Win Go",
      time: 180,
      period: "3Min",
      isActive: activeTab === 180,
      icon: {
        active: "/images/active_min_clock.png",
        default: "/images/min_clock.png",
      },
    },
    {
      id: 4,
      name: "Win Go",
      time: 300,
      period: "5Min",
      isActive: activeTab === 300,
      icon: {
        active: "/images/active_min_clock.png",
        default: "/images/min_clock.png",
      },
    },
  ];

  // Format time for backend compatibility
  const formatTimeForBackend = (seconds) => {
    if (seconds === 30) return "30sec";
    return `${seconds / 60}min`;
  };

  // Handle slot tab click
  const handleTabClick = (time) => {
    setActiveTab(time);

    // Dispatch the selected game type to Redux
    dispatch(setActiveGameType(formatTimeForBackend(time)));

    // Trigger the callback to parent
    if (onTabChange) {
      onTabChange(time);
    }
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
            {/* Icon */}
            <div className="w-12 h-12">
              <img
                src={category.isActive ? category.icon.active : category.icon.default}
                className="w-full"
                alt={category.name}
              />
            </div>
            {/* Game Name */}
            <span
              className={cn(
                "text-sm font-normal block",
                category.isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {category.name}
            </span>

            {/* Time Period */}
            <span
              className={cn(
                "text-sm font-normal transition-colors duration-300",
                category.isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {category.period}
            </span>

            {/* Active Indicator */}
            {category.isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary rounded-t-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WingoList;
