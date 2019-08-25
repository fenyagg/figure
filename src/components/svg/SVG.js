import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({left, top, children, ...props}) => {
  return (
    <svg
      style={{
        left: props.left,
        top: props.top,
      }}
      {...props}
    >
      {children}
    </svg>
  );
};

SVG.propTypes = {
  children: PropTypes.element,
  viewBox: PropTypes.string,
  class: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
  onClick: PropTypes.func,
};

export default SVG;
