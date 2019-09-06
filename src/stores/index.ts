import { getPath, getSnapshot, onAction, types } from 'mobx-state-tree';
import React from 'react';
import { CanvasStore } from './Canvas/Canvas';
import { EResizeType } from './Canvas/canvas.types';
import { HistoryStore } from './History/History';

export const model = types.model({
  canvas: CanvasStore,
  history: HistoryStore,
});

export const store = model.create({
  canvas: {
    figures: [],
  },
  history: {
    snapShots: [
      {
        figures: [],
      },
    ],
  },
});

export type IStore = typeof store;

// watch canvas actions
onAction(
  store,
  call => {
    if (getPath(store.canvas) === call.path) {
      const canvasSnap = getSnapshot(store.canvas);
      // don't save snapshots when dragging and resizing (too match)
      if (
        !canvasSnap.isDragging &&
        canvasSnap.resizingType === EResizeType.DISABLE
      ) {
        store.history.addSnapShot(canvasSnap);
      }
    }
  },
  true
);

export const StoreContext = React.createContext(store);
