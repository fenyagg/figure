import {
  applySnapshot,
  getRoot,
  getSnapshot,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { historyService } from 'services/HistoryService';
import { CanvasStore, IFigure } from '../Canvas/Canvas';

const CanvasHistoryModel = types.model({
  figures: CanvasStore.properties.figures,
});

export interface ICanvasHistory {
  figures: IFigure[];
}

export const HistoryStore = types
  .model({
    snapShots: types.array(CanvasHistoryModel),
    activeSnapIndex: types.optional(types.number, 0),
  })
  .views(self => ({
    get canBack() {
      return !!self.activeSnapIndex;
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

      historyService.saveSnap(self.snapShots[self.activeSnapIndex]);
    },
    changeIndexBy(indexChange: number) {
      const targetSnapIndex = self.activeSnapIndex + indexChange;
      const rootStore = getRoot(self);

      if (targetSnapIndex + 1 > self.snapShots.length) {
        return;
      }
      const historySnap = self.snapShots[targetSnapIndex];
      const targetSnap = {
        ...getSnapshot(rootStore.canvas),
        ...getSnapshot(historySnap),
      };
      self.activeSnapIndex = targetSnapIndex;
      applySnapshot(rootStore.canvas, targetSnap);

      historyService.saveSnap(historySnap);
    },
  }));
