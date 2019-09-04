import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useMemo } from 'react';
import { StoreContext } from 'stores';
import { IFigure } from '../../../../stores/Canvas';
import { EResizeType } from '../../../../stores/canvas.types';
import { figuresList } from '../../../svg';
import './Figure.scss';

interface IProps {
  figure: IFigure;
}

const dotList = [
  {
    type: EResizeType.LEFT_TOP,
    className: '_left-top',
  },
  {
    type: EResizeType.LEFT_BOT,
    className: '_left-bot',
  },
  {
    type: EResizeType.RIGHT_TOP,
    className: '_right-top',
  },
  {
    type: EResizeType.RIGHT_BOT,
    className: '_right-bot',
  },
];

const Figure: React.FC<IProps> = ({ figure }) => {
  const context = useContext(StoreContext);

  const isActive = useMemo(() => {
    return figure.id === context.canvas.activeFigureId;
  }, [figure.id, context.canvas.activeFigureId]);

  const onFigureClick = () => {
    if (!isActive) {
      context.canvas.setActiveFigure(figure.id);
    }
  };
  const onFigureMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton && isActive) {
      context.canvas.setIsDragging(true);
      context.canvas.setDragPosition(e.pageX, e.pageY);
    }
  };
  const onDotMouseDown = (e: MouseEvent, resizeType: EResizeType) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton && isActive) {
      context.canvas.setResizingType(resizeType);
      context.canvas.setDragPosition(e.pageX, e.pageY);
    }
  };

  const FigureImg = figuresList[figure.type];
  return (
    <div
      key={figure.id}
      style={{
        width: figure.width,
        height: figure.height,
        left: figure.positionLeft,
        top: figure.positionTop,
      }}
      className={classNames('figure', {
        _active: isActive,
        _dragging: isActive && context.canvas.isDragging,
      })}
      onClick={onFigureClick}
      onMouseDown={onFigureMouseDown}
    >
      {dotList.map(dot => (
        <div
          key={dot.type}
          onMouseDown={e => onDotMouseDown(e, dot.type)}
          className={`figure__dot ${dot.className}`}
        />
      ))}

      <FigureImg className="figure__img" />
    </div>
  );
};

export default observer(Figure);
