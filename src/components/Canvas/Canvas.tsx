import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StoreContext } from '../../stores';
import { IFigure } from '../../stores/Canvas';
import { figuresList } from '../figures';
import './Canvas.scss';

const dragPosition = { x: 0, y: 0 };

const Canvas = () => {
  const context = useContext(StoreContext);
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const onFigureClick = (e: MouseEvent, figureId: string) => {
    if (figureId !== context.canvas.activeFigureId) {
      context.canvas.setActiveFigure(figureId);
    }
  };
  const onFigureMouseDown = (e: MouseEvent, figureId: string) => {
    e.stopPropagation();
    const isLeftMouseButton = e.button === 0;
    if (isLeftMouseButton && figureId === context.canvas.activeFigureId) {
      setIsDragging(true);
      dragPosition.x = e.pageX;
      dragPosition.y = e.pageY;
    }
  };
  const onCanvasMouseUp = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    dragPosition.x = 0;
    dragPosition.y = 0;
  };
  const onCanvasMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    const changeX = e.pageX - dragPosition.x;
    const changeY = e.pageY - dragPosition.y;
    dragPosition.x = e.pageX;
    dragPosition.y = e.pageY;
    context.canvas.moveFigure(changeX, changeY);
  };
  const onCanvasMouseDown = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current) {
      context.canvas.setActiveFigure(null);
    }
  };
  const onCanvasMouseLeave = (e: MouseEvent) => {
    if (e.currentTarget === canvasRef.current) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const removeActiveFigure = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && context.canvas.activeFigureId) {
        context.canvas.deleteActiveFigure();
      }
    };
    window.document.addEventListener('keydown', removeActiveFigure);
    return () => {
      window.document.removeEventListener('keydown', removeActiveFigure);
    };
  }, [context.canvas]);

  return (
    <div
      className={'canvas'}
      style={{ width: context.canvas.width, height: context.canvas.height }}
      onMouseMove={onCanvasMouseMove}
      onMouseUp={onCanvasMouseUp}
      onMouseLeave={onCanvasMouseLeave}
      onMouseDown={onCanvasMouseDown}
      ref={canvasRef}
    >
      {context.canvas.figures.map((figure: IFigure) => {
        const Figure = figuresList[figure.type];
        return (
          <div
            key={figure.id}
            style={{
              width: figure.width,
              height: figure.height,
              left: figure.positionLeft,
              top: figure.positionTop,
            }}
            className={classNames('canvas__figure-container', {
              _active: context.canvas.activeFigureId === figure.id,
              _dragging: isDragging,
            })}
            onClick={e => onFigureClick(e, figure.id)}
            onMouseDown={e => onFigureMouseDown(e, figure.id)}
          >
            <Figure className="canvas__figure" />
          </div>
        );
      })}
    </div>
  );
};

export default observer(Canvas);
