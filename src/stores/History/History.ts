import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { store } from 'stores/index';
import { CanvasStore } from '../Canvas/Canvas';

const HistoryModel = types.model(CanvasStore.properties);

export const HistoryStore = types
  .model({
    snapShots: types.array(HistoryModel),
    activeSnapIndex: types.optional(types.number, 0),
  })
  .actions(self => ({
    addSnapShot(snap: SnapshotOut<typeof CanvasStore>) {
      self.snapShots.push(snap);
      self.activeSnapIndex = self.snapShots.length - 1;
    },
    goByStep(indexChange: number) {
      const targetSnapIndex = self.activeSnapIndex + indexChange;
      const prevSnap = self.snapShots[targetSnapIndex];

      if (prevSnap) {
        self.activeSnapIndex = targetSnapIndex;
        applySnapshot(store.canvas, getSnapshot(prevSnap));
      }
    },
  }));
