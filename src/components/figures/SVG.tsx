import React, { ReactElement } from 'react';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  left?: number;
  top?: number;
  children?: ReactElement;
}

const SVG: React.FC<ISVGProps> = ({
  left = 0,
  top = 0,
  children,
  ...props
}) => {
  return (
    <svg style={{ left, top }} {...props}>
      {children}
    </svg>
  );
};

export default SVG;
