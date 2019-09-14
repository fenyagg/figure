import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../hooks/useStore';
import styles from './FigureFrame.module.css';
import { EResizeType } from '../../../../stores/models/Canvas/canvas.types';
import classNames from 'classnames';

const dotList = [
  {
    type: EResizeType.LEFT_TOP,
    className: styles.dotLeftTop,
  },
  {
    type: EResizeType.LEFT_BOT,
    className: styles.dotLeftBot,
  },
  {
    type: EResizeType.RIGHT_TOP,
    className: styles.dotRightTop,
  },
  {
    type: EResizeType.RIGHT_BOT,
    className: styles.dotRightBot,
  },
];

const FigureFrame: React.FC = () => {
  const context = useStore();
  const selectedFigure = context.canvas.selectedFigure;

  const onDotMouseDown = (e: MouseEvent, resizeType: EResizeType) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton) {
      context.canvas.setResizingType(resizeType);
    }
  };

  const onFigureFrameMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton) {
      context.canvas.setIsDragging(true);
    }
  };

  if (!selectedFigure) {
    return null;
  }

  return (
    <div
      style={{
        width: selectedFigure.width,
        height: selectedFigure.height,
        transform: `translate3d(
          ${selectedFigure.left}px,
          ${selectedFigure.top}px,
          0
        )`,
      }}
      className={classNames(styles.figureFrame, {
        // TODO: fix bug with cursor changing
        //  https://bugs.chromium.org/p/chromium/issues/detail?id=26723
        [styles.figureFrameCanDrag]: !context.canvas.isResizing,
        [styles.figureFrameDragging]: context.canvas.isDragging,
      })}
      onMouseDown={onFigureFrameMouseDown}
    >
      {dotList.map(dot => (
        <div
          key={dot.type}
          onMouseDown={e => onDotMouseDown(e, dot.type)}
          className={classNames(styles.dot, dot.className)}
        />
      ))}
    </div>
  );
};

export default observer(FigureFrame);
