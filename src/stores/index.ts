import { onAction, types } from 'mobx-state-tree';
import React from 'react';
import { onCanvasAction } from './actionHandlers/onCanvasAction';
import { CanvasStore } from './models/Canvas/Canvas';
import { HistoryStore } from './models/History/History';

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

// watch canvas actions
onAction(store.canvas, onCanvasAction, true);

export type IStore = typeof store;

export const StoreContext = React.createContext(store);
