import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useMemo } from 'react';
import { StoreContext } from 'stores';
import { IFigure } from '../../../../stores/Canvas';
import { figuresList } from '../../../svg';
import './Figure.scss';

interface IProps {
  figure: IFigure;
}

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
  const onDotMouseDown = (e: MouseEvent) => {
    context.canvas.setIsResizing(true);
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
      <div onMouseDown={onDotMouseDown} className="figure__dot _left-top" />
      <div className="figure__dot _left-bot" />
      <div className="figure__dot _right-top" />
      <div className="figure__dot _right-bot" />

      <FigureImg className="figure__img" />
    </div>
  );
};

export default observer(Figure);
