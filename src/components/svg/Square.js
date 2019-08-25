import React from 'react';
import SVG from './SVG';

const Square = (props) => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <rect width="30" height="30" />
    </SVG>
  );
};

Square.propTypes = {
  ...SVG.propTypes,
};

export default Square;
