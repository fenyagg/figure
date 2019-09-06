import { SnapshotOut, types } from 'mobx-state-tree';
import { CanvasStore} from '../Canvas/Canvas';

const HistoryModel = types.model(CanvasStore.properties);

export const HistoryStore = types
  .model({
    snapShots: types.array(HistoryModel),
    activeSnap: types.optional(types.number, 0),
  })
  .actions(self => ({
    addSnapShot(snap: SnapshotOut<typeof CanvasStore>) {
      self.snapShots.push(snap);
    },
    back() {
      // applySnapshot(store.canvas, )
    },
  }));
