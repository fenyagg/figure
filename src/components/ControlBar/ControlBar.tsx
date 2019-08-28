import { figuresList } from 'components/figures';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StoreContext } from 'stores';
import './ControlBar.scss';

const ControlBar = () => {
  const context = useContext(StoreContext);
  const DEFAULT_FIGURE_SIZE = 150;
  return (
    <div className="control-bar">
      <div className="control-bar__figures-list">
        {Object.keys(figuresList).map(figureName => {
          const Figure = figuresList[figureName];
          return (
            <Figure
              key={figureName}
              onClick={() =>
                context.canvas.addFigure(
                  figureName,
                  DEFAULT_FIGURE_SIZE,
                  DEFAULT_FIGURE_SIZE
                )
              }
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
