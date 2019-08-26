import React, { ReactChildren, ReactNode } from 'react';

interface IProps {
  left: number,
  top: number,
  children: ReactChildren,
}

const SVG: React.FC<IProps> = ({left, top, children, ...props}) => {
  return (
    <svg style={{ left: left, top: top }} {...props}>
      {children}
    </svg>
  );
};

export default SVG;
