import { observer } from 'mobx-react-lite';
import React, { ReactChild, ReactElement, ReactNode, useContext } from 'react';
import './ControlBar.scss';
import Square from '../svg/Square';
import Triangle from '../svg/Triangle';
import Circle from '../svg/Circle';
import { StoreContext } from '../../stores';

const ControlBar = () => {
  const context = useContext(StoreContext);
  const figures: {
    [key: string]: React.FC,
  } = {
    square: Square,
    triangle: Triangle,
    circle: Circle,
  };
  return (
    <div className='control-bar'>
      <div className="control-bar__figures-list">
        {Object.keys(figures).map(figureName => {
          const Figure = figures[figureName];
          return (
            <Figure
              key={figureName}
              onClick={() => context.canvas.addFigure(figureName)}
              className="control-bar__figure"
            />
          );
        })}
      </div>
      <div className="control-bar__nav">
        <div className="control-bar__nav-link">&larr; prev</div>
        <div className="control-bar__nav-link">next &rarr;</div>
      </div>
    </div>
  );
};

export default observer(ControlBar);
