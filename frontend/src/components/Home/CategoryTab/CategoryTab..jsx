import React from "react";

const CategoryTab = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h2 className="text-sm font-medium text-white">Lottery</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTab;
