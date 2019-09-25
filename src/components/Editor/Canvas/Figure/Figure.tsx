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

  const isSelected = useMemo(() => {
    return figure.id === context.canvas.selectedFigureId;
  }, [figure.id, context.canvas.selectedFigureId]);

  const onFigureClick = (e: MouseEvent) => {
    if (!isSelected) {
      context.canvas.selectFigure(figure.id);
    }
  };

  const onFigureMouseDown = (e: MouseEvent) => {
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton) {
      context.canvas.startDragging(figure.id);
    }
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
      insideEvents={{
        onClick: onFigureClick,
        onMouseDown: onFigureMouseDown,
      }}
    />
  );
};

export default observer(Figure);
