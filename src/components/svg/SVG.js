import React from 'react';
import PropTypes from "prop-types";

const SVG = (props) => {
  return (
    <svg
      viewBox={props.viewBox}
      className={props.class}
      style={{
        left: props.left,
        top: props.top,
      }}
    >
      {props.children}
    </svg>
  );
};

SVG.propTypes = {
  children: PropTypes.element,
  viewBox: PropTypes.string,
  class: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
};

export default SVG;
