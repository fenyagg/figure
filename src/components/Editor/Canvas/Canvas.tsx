import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, MutableRefObject, useRef } from 'react';
import styles from './Canvas.module.css';
import Figure from './Figure/Figure';
import FigureFrame from './FigureFrame/FigureFrame';
import classNames from 'classnames';
import { EResizeType } from 'stores/models/Canvas/canvas.types';

const Canvas = () => {
  const context = useStore();
  const canvasRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const onClick = (e: MouseEvent) => {
    if (
      e.currentTarget === canvasRef.current &&
      context.canvas.selectedFigureId
    ) {
      context.canvas.selectFigure(null);
    }
  };
  const onMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current) {
      if (context.canvas.isDragging) {
        context.canvas.stopDragging();
      }
    }
  };
  const onMouseMove = (e: MouseEvent) => {
    if (context.canvas.isDragging) {
      context.canvas.moveDraggingFigure(e.movementX, e.movementY);
    }
    const activeDotPosition = context.canvas.activeDotPosition;
    if (context.canvas.isResizing && canvasRef.current && activeDotPosition) {
      // resize based on relative position and activeDot
      context.canvas.resizeSelectedFigure(
        e.pageX - canvasRef.current.offsetLeft - activeDotPosition.x,
        e.pageY - canvasRef.current.offsetTop - activeDotPosition.y
      );
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
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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
