import { onSnapshot, types } from 'mobx-state-tree';
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
  history: {},
});

export type IStore = typeof store;

onSnapshot(store.canvas, newSnapshot => {
  if (
    !newSnapshot.isDragging &&
    newSnapshot.resizingType === EResizeType.DISABLE
  ) {
    store.history.addSnapShot(newSnapshot);
  }
});

export const StoreContext = React.createContext(store);
