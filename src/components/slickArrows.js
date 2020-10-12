import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as ArrowLeft } from "assets/img/svg/arrow-left.svg";
import { ReactComponent as ArrowRight } from "assets/img/svg/arrow-right.svg";

export const SlickArrows = forwardRef((props, ref) => {
  const [index, setIndex] = useState(false);

  useEffect(() => {
    setIndex(props.currentSlide);
  }, [props.currentSlide, index]);

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };

  return (
    <div className="slick__arrows">
      <div className="slick__arrow slick__arrow--left" onClick={previous}>
        <ArrowLeft className="slick__icon" />
      </div>

      <div className="slick__arrow slick__arrow--right" onClick={next}>
        <ArrowRight className="slick__icon" />
      </div>
    </div>
  );
});

SlickArrows.displayName = "SlickArrows";

SlickArrows.propTypes = {
  currentSlide: PropTypes.number,
  next: PropTypes.func,
  prev: PropTypes.func,
  totalSlides: PropTypes.number
};

SlickArrows.defaultProps = {
  currentSlide: 0,
  totalSlides: 0
};
