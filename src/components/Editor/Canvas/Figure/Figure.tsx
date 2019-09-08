import classNames from 'classnames';
import SvgFigure from 'components/SvgFigure/SvgFigure';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useMemo } from 'react';
import { IFigure } from 'stores/models/Canvas/Canvas';
import { EResizeType } from 'stores/models/Canvas/canvas.types';
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
  const context = useStore();

  const isActive = useMemo(() => {
    return figure.id === context.canvas.selectedFigureId;
  }, [figure.id, context.canvas.selectedFigureId]);

  const onFigureClick = () => {
    if (!isActive) {
      context.canvas.selectFigure(figure.id);
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

  return (
    <div
      key={figure.id}
      style={{
        width: figure.width,
        height: figure.height,
        transform: `translate3d(
          ${figure.left}px,
          ${figure.top}px,
          0
        )`,
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

      <SvgFigure
        type={figure.type}
        preserveAspectRatio="none"
        className="figure__img"
      />
    </div>
  );
};

export default observer(Figure);
