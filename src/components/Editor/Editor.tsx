import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useContext, useEffect } from 'react';
import { StoreContext } from 'stores';
import Canvas from './Canvas/Canvas';
import ControlBar from './ControlBar/ControlBar';
import './Editor.scss';

const Editor = () => {
  const context = useContext(StoreContext);

  const onMouseMove = (e: MouseEvent) => {
    if (!context.canvas.isDragging) {
      return;
    }
    const changeX = e.pageX - context.canvas.dragPosition.x;
    const changeY = e.pageY - context.canvas.dragPosition.y;
    context.canvas.setDragPosition(e.pageX, e.pageY);
    context.canvas.moveFigure(changeX, changeY);
  };
  const onMouseUp = (e: MouseEvent) => {
    if (!context.canvas.isDragging) {
      return;
    }
    context.canvas.setIsDragging(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (context.canvas.activeFigureId) {
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
      onMouseUp={onMouseUp}
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
