import React from 'react';
import './App.scss';
import ControlBar from '../../components/ControlBar/ControlBar';
import Canvas from '../../components/Canvas/Canvas';

const App = () => {
  return (
    <div className="container">
      <ControlBar />
      <Canvas />
    </div>
  );
};

export default App;
