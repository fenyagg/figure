import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { CanvasStore } from '../Canvas/Canvas';
import { store } from '../index';

const HistoryModel = types.model(CanvasStore.properties);

export const HistoryStore = types
  .model({
    snapShots: types.array(HistoryModel),
    activeSnapIndex: types.optional(types.number, 0),
  })
  .views(self => ({
    get canBack() {
      return self.activeSnapIndex;
    },
    get canForward() {
      return self.activeSnapIndex + 1 < self.snapShots.length;
    },
  }))
  .actions(self => ({
    addSnapShot(snap: SnapshotOut<typeof CanvasStore>) {
      const humanActiveIndex = self.activeSnapIndex + 1;
      // remove snaps after active
      if (humanActiveIndex < self.snapShots.length) {
        self.snapShots.splice(
          humanActiveIndex,
          self.snapShots.length - humanActiveIndex
        );
      }
      self.snapShots.push(snap);
      self.activeSnapIndex = self.snapShots.length - 1;
    },
    changeIndexBy(indexChange: number) {
      const targetSnapIndex = self.activeSnapIndex + indexChange;
      const prevSnap = self.snapShots[targetSnapIndex];

      if (prevSnap) {
        self.activeSnapIndex = targetSnapIndex;
        applySnapshot(store.canvas, getSnapshot(prevSnap));
      }
    },
  }));
