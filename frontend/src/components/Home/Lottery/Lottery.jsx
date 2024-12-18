import React from "react";
import Card from "../../ui/Card";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { lotteryData } from "./lotteryData";

const Lottery = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h2 className="text-sm font-medium text-white">Lottery</h2>
            </div>
            <span className="text-foreground inline-block px-2 rounded-full text-xs bg-accent">
              More 3
            </span>
          </div>
          <span className="text-muted-foreground text-xs">
            Fair and diverse lottery gameplay
          </span>
        </div>

        <div className="flex gap-2">
          <button>
            <IoIosArrowDropleftCircle className="w-6 h-6 text-foreground" />
          </button>
          <button>
            <IoIosArrowDroprightCircle className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {lotteryData.map((item) => (
          <Card key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lottery;
