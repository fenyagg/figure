import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useEffect, useRef } from 'react';
import Canvas from './Canvas/Canvas';
import ControlBar from './ControlBar/ControlBar';
import styles from './Editor.module.css';

const Editor = () => {
  const context = useStore();
  const editorRef = useRef(null);
  const isEditorTarget = (target: EventTarget) => {
    return target === editorRef.current;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (context.canvas.isDragging) {
      context.canvas.moveSelectedFigure(e.movementX, e.movementY);
    }
    if (context.canvas.isResizing) {
      context.canvas.resizeSelectedFigure(e.movementX, e.movementY);
    }
  };
  const disableActions = (e: MouseEvent) => {
    if (isEditorTarget(e.currentTarget)) {
      if (context.canvas.isDragging) {
        context.canvas.stopDragging();
      }
      if (context.canvas.isResizing) {
        context.canvas.stopResizing();
      }
    }
  };

  useEffect(() => {
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
    <div
      onMouseMove={onMouseMove}
      onMouseUp={disableActions}
      onMouseLeave={disableActions}
      className={styles.mainContainer}
      ref={editorRef}
    >
      <div className={styles.content}>
        <ControlBar />
        <Canvas />
      </div>
    </div>
  );
};

export default observer(Editor);
