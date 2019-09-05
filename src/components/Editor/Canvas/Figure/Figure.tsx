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
    return figure.id === context.canvas.selectedFigureId;
  }, [figure.id, context.canvas.selectedFigureId]);

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
    }
  };
  const onDotMouseDown = (e: MouseEvent, resizeType: EResizeType) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton && isActive) {
      context.canvas.setResizingType(resizeType);
    }
  };

  const FigureSvg = figuresList[figure.type];
  return (
    <div
      key={figure.id}
      style={{
        width: figure.width,
        height: figure.height,
        left: figure.left,
        top: figure.top,
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

      <FigureSvg preserveAspectRatio="none" className="figure__img" />
    </div>
  );
};

export default observer(Figure);
