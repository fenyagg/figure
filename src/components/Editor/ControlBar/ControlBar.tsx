import classNames from 'classnames';
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
        {context.canvas.figureTypes.map(figureType => {
          const Figure = figuresList[figureType];
          return (
            <Figure
              key={figureType}
              onClick={() => context.canvas.addFigure(figureType)}
              className="control-bar__figure"
            />
          );
        })}
      </div>
      <div className="control-bar__nav">
        <div
          onClick={() => context.history.changeIndexBy(-1)}
          className={classNames({
            'control-bar__nav-link': true,
            _disabled: !context.history.canBack,
          })}
        >
          &larr; prev
        </div>
        <div
          onClick={() => context.history.changeIndexBy(1)}
          className={classNames({
            'control-bar__nav-link': true,
            _disabled: !context.history.canForward,
          })}
        >
          next &rarr;
        </div>
      </div>
    </div>
  );
};

export default observer(ControlBar);
