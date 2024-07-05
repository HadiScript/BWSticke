"use client";
import { useEffect, useState } from "react";
import InputRange from "react-input-range";

const PriceRangeSlider = ({ min, max, onChange }) => {
  const changes = (value) => {
    console.log(value);
    onChange({ min: value.min, max: value.max });
  };
  return (
    <div className="range-slider-one">
      <InputRange
        // formatLabel={(value) => ``}
        minValue={min}
        maxValue={max}
        value={{ min: min, max: max }}
        onChange={(value) => changes(value)}
      />

      <div className="input-outer">
        <div className="amount-outer">
          <span className="area-amount">{max}$ </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
