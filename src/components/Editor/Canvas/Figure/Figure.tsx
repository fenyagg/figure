import classNames from 'classnames';
import SvgFigure from 'components/SvgFigure/SvgFigure';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useMemo, useState } from 'react';
import { IFigure } from 'stores/models/Canvas/Canvas';
import styles from './Figure.module.css';

interface IProps {
  figure: IFigure;
}

const Figure: React.FC<IProps> = ({ figure }) => {
  const context = useStore();
  const [isHoldMouseDown, setHoldMouseDown] = useState(false);

  const isSelected = useMemo(() => {
    return figure.id === context.canvas.selectedFigureId;
  }, [figure.id, context.canvas.selectedFigureId]);

  const onFigureMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    if (context.canvas.isDragging) {
      context.canvas.stopDragging();
    }
    if (!isSelected && isHoldMouseDown) {
      context.canvas.selectFigure(figure.id);
      setHoldMouseDown(false);
    }
  };
  const onFigureMouseDown = (e: MouseEvent) => {
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton) {
      setHoldMouseDown(true);
      context.canvas.startDragging(figure.id);
    }
  };
  const onFigureMouseMove = (e: MouseEvent) => {
    setHoldMouseDown(false);
  };

  return (
    <SvgFigure
      type={figure.type}
      style={{
        width: figure.width,
        height: figure.height,
        transform: `translate3d(
          ${figure.left}px,
          ${figure.top}px,
          0
        )`,
      }}
      preserveAspectRatio="none"
      className={classNames(styles.figure, {
        [styles.figureSelected]: isSelected,
      })}
      insideClassName={styles.figureInside}
      onMouseMove={onFigureMouseMove}
      insideEvents={{
        onMouseUp: onFigureMouseUp,
        onMouseDown: onFigureMouseDown,
      }}
    />
  );
};

export default observer(Figure);
