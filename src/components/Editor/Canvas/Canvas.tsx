import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useRef } from 'react';
import styles from './Canvas.module.css';
import Figure from './Figure/Figure';
import FigureFrame from './FigureFrame/FigureFrame';
import classNames from 'classnames';
import { EResizeType } from '../../../stores/models/Canvas/canvas.types';

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
      context.canvas.stopDragging();
    }
  };

  return (
    <div
      className={classNames({
        [styles.canvas]: true,
        [styles.cursorNW]: [
          EResizeType.LEFT_TOP,
          EResizeType.RIGHT_BOT,
        ].includes(context.canvas.resizingType),
        [styles.cursorNE]: [
          EResizeType.LEFT_BOT,
          EResizeType.RIGHT_TOP,
        ].includes(context.canvas.resizingType),
      })}
      style={{ width: context.canvas.width, height: context.canvas.height }}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      ref={canvasRef}
    >
      {context.canvas.figures.map(figure => (
        <Figure key={figure.id} figure={figure} />
      ))}
      {context.canvas.selectedFigure && <FigureFrame />}
    </div>
  );
};

export default observer(Canvas);
