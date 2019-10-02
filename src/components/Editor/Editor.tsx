import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useEffect, useRef } from 'react';
import Canvas from './Canvas/Canvas';
import ControlBar from './ControlBar/ControlBar';
import styles from './Editor.module.css';

const Editor = () => {
  const context = useStore();

  useEffect(() => {
    // TODO: move to canvas
    const onKeyDown = (e: KeyboardEvent) => {
      if (context.canvas.selectedFigureId) {
        if (e.key === 'Delete') {
          context.canvas.deleteSelectedFigure();
        }
        if (e.key === 'Escape') {
          context.canvas.selectFigure(null);
        }
      }
    };
    window.document.addEventListener('keydown', onKeyDown);
    return () => {
      window.document.removeEventListener('keydown', onKeyDown);
    };
  }, [context.canvas]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <ControlBar />
        <Canvas />
      </div>
    </div>
  );
};

export default observer(Editor);
