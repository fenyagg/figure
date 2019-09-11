import classNames from 'classnames';
import SvgFigure from 'components/SvgFigure/SvgFigure';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './ControlBar.module.css';

const ControlBar = () => {
  const context = useStore();

  return (
    <div className={styles.controlBar}>
      <div className={styles.figureList}>
        {context.canvas.figureTypes.map(figureType => {
          return (
            <SvgFigure
              key={figureType}
              type={figureType}
              onClick={() => context.canvas.addFigure(figureType)}
              className={styles.figure}
            />
          );
        })}
      </div>
      <div className={styles.nav}>
        <div
          onClick={() => context.history.changeIndexBy(-1)}
          className={classNames({
            [styles.navLink]: true,
            [styles.navLinkDisabled]: !context.history.canBack,
          })}
        >
          &larr; prev
        </div>
        <div
          onClick={() => context.history.changeIndexBy(1)}
          className={classNames({
            [styles.navLink]: true,
            [styles.navLinkDisabled]: !context.history.canForward,
          })}
        >
          next &rarr;
        </div>
      </div>
    </div>
  );
};

export default observer(ControlBar);
