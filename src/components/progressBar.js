/* eslint-disable no-else-return */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";

export const ProgressBar = forwardRef((props, ref) => {
  const { volumeProgressRef, volumeProgressHandleRef } = ref;

  const volumeRangeStyle = {
    width: "100%",
    background: `linear-gradient(to right, #F2C94C ${props.value}0%, #e9ecef 0)`,
    borderRadius: "20px",
    height: "5px",
    cursor: "pointer",
    outline: "none"
  };
  if (props.type === "volume") {
    return (
      <div id="" ref={volumeProgressRef} className="playerseeker">
        <input
          type="range"
          step={props.step}
          max={props.maxValue}
          min={props.minValue}
          ref={volumeProgressHandleRef}
          style={volumeRangeStyle}
          onChange={props.onChange}
          name={props.name}
          value={Number(props.value)}
        />
      </div>
    );
  }
});

ProgressBar.displayName = "ProgressBar";

ProgressBar.propTypes = {
  value: PropTypes.number,
  mouseDown: PropTypes.func,
  mouseMove: PropTypes.func,
  step: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func
};
