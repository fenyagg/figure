import React from 'react';
import SVG from './SVG';

const Circle = (props) => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <ellipse cx="15" cy="15" rx="15" ry="15" />
    </SVG>
  );
};

Circle.propTypes = {
  ...SVG.propTypes,
};

export default Circle;
