import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import './Canvas.scss';

const Canvas = () => {
  const context = useContext(StoreContext);
  return <div className="canvas" />;
};

export default observer(Canvas);
