import { getSnapshot, SnapshotIn, types } from "mobx-state-tree";
import { HistoryStore } from "./History";
import { CanvasStore } from "../Canvas/Canvas";

type IHistoryStore = SnapshotIn<typeof HistoryStore>;
type ICanvasStore = SnapshotIn<typeof CanvasStore>;

const defaultCanvasStore = {figures: []};
const defaultHistoryStore: IHistoryStore = {
  snapShots: [defaultCanvasStore]
};

const model = types.model({
  canvas: CanvasStore,
  history: HistoryStore,
});

const getStore = (historySnap: IHistoryStore = defaultHistoryStore, canvasSnap: ICanvasStore = defaultCanvasStore) => model.create({
  canvas: canvasSnap,
  history: historySnap,
});

const getCanvasSnap = (snap: ICanvasStore = defaultCanvasStore) => getSnapshot(CanvasStore.create(snap));

describe('Canvas model', () => {
  it('should create store', () => {
    const expectResult: IHistoryStore = {
      snapShots: [
        getCanvasSnap(),
      ],
      activeSnapIndex: 0,
    };
    return expect(getSnapshot(getStore().history)).toEqual(expectResult);
  });

  describe("Actions", () => {
    describe("addSnapShot", () => {
      it("should add snap success", () => {
        const store = getStore();
        const newCanvasSnap = getCanvasSnap({
          selectedFigureId: 'test'
        });
        store.history.addSnapShot(newCanvasSnap);
        const expectResult: IHistoryStore = {
          snapShots: [
            getCanvasSnap(),
            newCanvasSnap,
          ],
          activeSnapIndex: 1,
        };

        return expect(store.history).toEqual(expectResult);
      });

      it("should add snap and remove all after active", () => {
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
            getCanvasSnap(),
            getCanvasSnap(),
          ],
          activeSnapIndex: 0,
        });
        const newCanvasSnap = getCanvasSnap({
          selectedFigureId: 'test'
        });
        store.history.addSnapShot(newCanvasSnap);
        const expectResult: IHistoryStore = {
          snapShots: [
            getCanvasSnap(),
            newCanvasSnap,
          ],
          activeSnapIndex: 1,
        };

        return expect(store.history).toEqual(expectResult);
      });
    });

    describe("changeIndexBy", () => {
      it("should apply snap to canvas store", () => {
        const sampleCanvasStore = getCanvasSnap({
          selectedFigureId: 'figure',
        });
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
            sampleCanvasStore,
          ],
          activeSnapIndex: 0,
        });
        store.history.changeIndexBy(1);

        return expect(getSnapshot(store.canvas)).toEqual(sampleCanvasStore);
      });

      it("should change active index", () => {
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
            getCanvasSnap(),
          ],
          activeSnapIndex: 1,
        });
        store.history.changeIndexBy(-1);

        return expect(store.history.activeSnapIndex).toEqual(0);
      });

      it("should not apply for wrong index", () => {
        const sampleCanvasStore = getCanvasSnap({
          selectedFigureId: 'figure',
        });
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
            sampleCanvasStore,
          ],
          activeSnapIndex: 1,
        });
        store.history.changeIndexBy(1);

        expect(store.history.activeSnapIndex).toEqual(1);
        return expect(getSnapshot(store.canvas)).toEqual(getCanvasSnap());
      });
    });
  });

  describe("Views", () => {
    describe("canBack", () => {
      it("should be false if activeSnapIndex = 0", () => {
        const store = getStore({
          snapShots: [],
          activeSnapIndex: 0
        });
        return expect(store.history.canBack).toBeFalsy();
      });

      it("should be true if activeSnapIndex > 0", () => {
        const store = getStore({
          snapShots: [],
          activeSnapIndex: 1
        });
        return expect(store.history.canBack).toBeTruthy();
      });
    });

    describe("canForward", () => {
      it("should be false if activeSnapIndex >= snapShots.length", () => {
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
          ],
          activeSnapIndex: 1
        });
        return expect(store.history.canForward).toBeFalsy();
      });

      it("should be true if activeSnapIndex < snapShots.length", () => {
        const store = getStore({
          snapShots: [
            getCanvasSnap(),
            getCanvasSnap(),
          ],
          activeSnapIndex: 0
        });
        return expect(store.history.canForward).toBeTruthy();
      });
    });
  });

});
