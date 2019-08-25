import { observer } from 'mobx-react-lite';
import React from 'react';
import './ControlBar.scss';
import Square from '../svg/Square';
import Triangle from '../svg/Triangle';
import Circle from '../svg/Circle';

const ControlBar = () => {
  return (
    <div className='control-bar'>
      <div className="control-bar__figures-list">
        <Square class="control-bar__figure" />
        <Triangle class="control-bar__figure" />
        <Circle class="control-bar__figure" />
      </div>
      <div className="control-bar__nav">
        <div className="control-bar__nav-link">&larr; prev</div>
        <div className="control-bar__nav-link">next &rarr;</div>
      </div>
    </div>
  );
};

export default observer(ControlBar);
