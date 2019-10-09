import { observer } from 'mobx-react-lite';
import React from 'react';
import Canvas from './Canvas/Canvas';
import ControlBar from './ControlBar/ControlBar';
import styles from './Editor.module.css';

const Editor = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <ControlBar />
        <Canvas />
      </div>
    </div>
  );
};

export default observer(Editor);
