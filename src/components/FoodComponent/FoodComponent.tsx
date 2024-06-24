import React from "react";
import "./FoodComponent.modules.css";

export const FoodComponent: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
      <div
          className='food'
          style={{ left: `${x * 32}px`, top: `${y * 32}px` }}
      ></div>
  );
};