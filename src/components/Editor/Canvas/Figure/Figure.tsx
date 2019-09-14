import classNames from 'classnames';
import SvgFigure from 'components/SvgFigure/SvgFigure';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useMemo } from 'react';
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

  const onFigureClick = () => {
    if (!isSelected) {
      context.canvas.selectFigure(figure.id);
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
      className={classNames(styles.figure, {
        [styles.figureSelected]: isSelected,
      })}
      onClick={onFigureClick}
    >
      <SvgFigure
        type={figure.type}
        preserveAspectRatio="none"
        className={styles.figureImg}
      />
    </div>
  );
};

export default observer(Figure);
