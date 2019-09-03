import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useRef } from 'react';
import { StoreContext } from '../../../stores';
import './Canvas.scss';
import Figure from './Figure/Figure';

const Canvas = () => {
  const context = useContext(StoreContext);
  const canvasRef = useRef(null);
  const onMouseDown = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current) {
      context.canvas.setActiveFigure(null);
    }
  };
  const onMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current) {
      context.canvas.setIsDragging(false);
    }
  };

  return (
    <div
      className={'canvas'}
      style={{ width: context.canvas.width, height: context.canvas.height }}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      ref={canvasRef}
    >
      {context.canvas.figures.map(figure => (
        <Figure key={figure.id} figure={figure} />
      ))}
    </div>
  );
};

export default observer(Canvas);
