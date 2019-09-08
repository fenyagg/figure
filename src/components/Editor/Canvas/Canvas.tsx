import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useRef } from 'react';
import './Canvas.scss';
import Figure from './Figure/Figure';

const Canvas = () => {
  const context = useStore();
  const canvasRef = useRef(null);
  const onMouseDown = (e: MouseEvent) => {
    if (
      e.currentTarget === canvasRef.current &&
      context.canvas.selectedFigureId
    ) {
      context.canvas.selectFigure(null);
    }
  };
  const onMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current && context.canvas.isDragging) {
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
