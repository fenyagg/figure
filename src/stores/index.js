import { types } from 'mobx-state-tree';
import { CanvasStore } from './Canvas';
import React from 'react';

const model = types.model({
  canvas: CanvasStore,
});

export const store = model.create({
  canvas: {
    figures: [],
    activeFigureId: undefined,
  }
});

export const StoreContext = React.createContext(store);
