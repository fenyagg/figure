import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useEffect } from 'react';
import { StoreContext } from 'stores';
import { EResizeType } from '../../stores/canvas.types';
import Canvas from './Canvas/Canvas';
import ControlBar from './ControlBar/ControlBar';
import './Editor.scss';

const Editor = () => {
  const context = useContext(StoreContext);

  const onMouseMove = (e: MouseEvent) => {
    if (context.canvas.isDragging) {
      context.canvas.moveFigure(e.movementX, e.movementY);
    }
    if (context.canvas.isResizing) {
      context.canvas.resizeFigure(e.movementX, e.movementY);
    }
  };
  const disableActions = () => {
    if (context.canvas.isDragging) {
      context.canvas.setIsDragging(false);
    }
    if (context.canvas.isResizing) {
      context.canvas.setResizingType(EResizeType.DISABLE);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (context.canvas.selectedFigureId) {
        if (e.key === 'Delete') {
          context.canvas.deleteActiveFigure();
        }
        if (e.key === 'Escape') {
          context.canvas.setActiveFigure(null);
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
      className="main-container"
    >
      <div className="content">
        <ControlBar />
        <Canvas />
      </div>
    </div>
  );
};

export default observer(Editor);
