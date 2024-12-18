import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative h-full border border-border ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
