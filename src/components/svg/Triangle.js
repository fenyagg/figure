import React from 'react';
import SVG from './SVG';

const Triangle = (props) => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <polygon points="15,0 0,30 30,30" />
    </SVG>
  );
};

Triangle.propTypes = {
  ...SVG.propTypes,
};

export default Triangle;
