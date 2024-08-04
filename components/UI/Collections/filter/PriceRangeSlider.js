"use client";
import { useCallback, useEffect, useRef, useState } from "react";
// import InputRange from "react-input-range";
import { Dash, PlayFill } from "@styled-icons/bootstrap";

const PriceRangeSlider = ({ min, max, onChange }) => {
  // const changes = (value) => {
  //   console.log(value);
  //   onChange({ min: value.min, max: value.max });
  // };

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  function updatePriceRange() {
    onChange({ min: minVal, max: maxVal });
  }
  return (
    <div className="range-slider-one">
      <div className="double_range_slider_box">
        <div className="double_range_slider">
          <span className="range_track" id="range_track"></span>

          <input
            id="rangeInput"
            type="range"
            className="min"
            step="0"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              minValRef.current = value;
            }}
          />
          <input
            id="rangeInput"
            type="range"
            className="max"
            step="0"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
          />

          <span className="minvalue">{minVal}</span>
          <div
            className="maxvalue"
            type="number"
            value={maxVal}
            min={min}
            max={max}
            onChange={(event) => {
              const value = Math.max(+event.target.value > +max ? +max : +event.target.value, minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
          >
            {maxVal}
          </div>
        </div>
        <button className="btn" onClick={updatePriceRange}>
          <PlayFill color="#d10d0d" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
