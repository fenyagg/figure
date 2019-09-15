import { onAction, types } from 'mobx-state-tree';
import React from 'react';
import { historyService } from 'services/HistoryService';
import { canvasActionHandler } from './actionHandlers/canvasActionHandler';
import { CanvasStore } from './models/Canvas/Canvas';
import { HistoryStore } from './models/History/History';

const model = types.model({
  canvas: CanvasStore,
  history: HistoryStore,
});

const canvasStoreData = {
  figures: [],
  ...historyService.getSnap(),
};

export const store = model.create({
  canvas: canvasStoreData,
  history: {
    snapShots: [canvasStoreData],
  },
});

onAction(store, canvasActionHandler, true);

export type IStore = typeof store;
export const StoreContext = React.createContext(store);
