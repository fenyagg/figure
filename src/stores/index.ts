import { types } from 'mobx-state-tree';
import React from 'react';
import { CanvasStore } from './Canvas/Canvas';

const model = types.model({
  canvas: CanvasStore,
});

export const store = model.create({
  canvas: {
    figures: [],
    width: 800,
    height: 600,
  },
});

export const StoreContext = React.createContext(store);
