import { onAction, types } from 'mobx-state-tree';
import React from 'react';
import { canvasService } from 'services/CanvasService';
import { onCanvasAction } from './actionHandlers/onCanvasAction';
import { CanvasStore } from './models/Canvas/Canvas';
import { HistoryStore } from './models/History/History';

const model = types.model({
  canvas: CanvasStore,
  history: HistoryStore,
});

const canvasStoreData = canvasService.getValue() || {
  figures: [],
};
export const store = model.create({
  canvas: canvasStoreData,
  history: {
    snapShots: [canvasStoreData],
  },
});

onAction(store, onCanvasAction, true);

export type IStore = typeof store;

export const StoreContext = React.createContext(store);
