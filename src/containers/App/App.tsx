import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import ControlBar from '../../components/ControlBar/ControlBar';
import './App.scss';

const App = () => {
  return (
    <div className="container">
      <ControlBar />
      <Canvas />
    </div>
  );
};

export default App;
