import { figuresList } from 'components/svg';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import './ControlBar.scss';

const ControlBar = () => {
  const context = useStore();

  return (
    <div className="control-bar">
      <div className="control-bar__figures-list">
        {Object.keys(figuresList).map(figureName => {
          const Figure = figuresList[figureName];
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
