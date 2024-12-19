import React from "react";
import Card from "../../ui/Card";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { popularData } from "./popularData";

const Popular = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h2 className="text-sm font-medium text-white">Original</h2>
            </div>
          </div>
          <span className="text-muted-foreground text-xs">
            The games are independently developed by our team, fun, fair, and
            safe
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-2">
        {popularData.map((item) => (
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

export default Popular;
