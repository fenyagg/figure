import { CanvasStore } from "./Canvas";
import { getSnapshot, SnapshotIn } from "mobx-state-tree";
import { EFigureType, EResizeType } from "./canvas.types";

type ICanvasStore = SnapshotIn<typeof CanvasStore>;
const defaultStore = {figures: []};

const getStore = (snap: ICanvasStore = defaultStore) => CanvasStore.create(snap);

describe('Canvas model', () => {
  it('should create store', () => {
    const expectResult = {
      figures: [],
      selectedFigureId: null,
      width: 800,
      height: 600,
      isDragging: false,
      resizingType: EResizeType.DISABLE,
      minFigureWidth: 100,
      minFigureHeight: 100,
      figureTypes: [
        ...Object.values(EFigureType)
      ]
    };
    return expect(getSnapshot(getStore())).toEqual(expectResult);
  });

  describe('Action', () => {
    describe("addFigure", () => {
      it('should handle success', () => {
        const store = getStore();
        const newFigure = store.addFigure(EFigureType.CIRCLE, 200, 300);
        const expectResult: ICanvasStore = {
          ...store,
          figures: [ {
            id: newFigure.id,
            type: EFigureType.CIRCLE,
            width: 200,
            height: 300,
            left: store.width / 2 - 200 / 2,
            top: store.height / 2 - 300 / 2,
          } ]
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("selectFigure", () => {
      it('should handle success', () => {
        const store = getStore();
        store.selectFigure('testId');
        const expectResult: ICanvasStore = {
          ...store,
          selectedFigureId: 'testId',
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("moveSelectedFigure", () => {
      it('should move success', () => {
        const startStore = {
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
          selectedFigureId: 'test',
        };
        const store = getStore(startStore);
        store.moveSelectedFigure(100, 200);
        const expectResult: ICanvasStore = {
          ...store,
          figures: [
            {
              ...startStore.figures[0],
              left: 110,
              top: 220,
            }
          ],
        };
        return expect(store).toEqual(expectResult);
      });

      it('should not move without selected figure', () => {
        const startStore = {
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
          selectedFigureId: null,
        };
        const store = getStore(startStore);
        store.moveSelectedFigure(100, 200);
        const expectResult: ICanvasStore = {
          ...store,
          figures: [...startStore.figures],
        };
        return expect(store).toEqual(expectResult);
      });

      it('should set position more than 0', () => {
        const startStore = {
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
          selectedFigureId: 'test',
        };
        const store = getStore(startStore);
        store.moveSelectedFigure(-100, -200);
        const expectResult: ICanvasStore = {
          ...store,
          figures: [
            {
              ...startStore.figures[0],
              left: 0,
              top: 0,
            }
          ],
        };
        return expect(store).toEqual(expectResult);
      });

      it('should set position less than canvas', () => {
        const startStore: ICanvasStore = {
          width: 400,
          height: 400,
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 0,
              top: 0,
            }
          ],
          selectedFigureId: 'test',
        };
        const store = getStore(startStore);
        store.moveSelectedFigure(400, 400);
        const expectResult: ICanvasStore = {
          ...store,
          figures: [
            {
              ...store.figures[0],
              left: store.width - 100,
              top: store.height - 100,
            }
          ],
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("deleteSelectedFigure", () => {
      it('should handle success', () => {
        const startStore = {
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
          selectedFigureId: 'test',
        };
        const store = getStore(startStore);
        store.deleteSelectedFigure();
        const expectResult: ICanvasStore = {
          ...store,
          selectedFigureId: null,
          figures: [],
        };
        return expect(store).toEqual(expectResult);
      });

      it('should not delete without selected figure', () => {
        const startStore = {
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
          selectedFigureId: null,
        };
        const store = getStore(startStore);
        store.deleteSelectedFigure();
        const expectResult: ICanvasStore = {
          ...store,
          selectedFigureId: null,
          figures: [
            {
              id: 'test',
              type: EFigureType.CIRCLE,
              width: 100,
              height: 100,
              left: 10,
              top: 20,
            }
          ],
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("setIsDragging", () => {
      it('should handle success', () => {
        const startStore = {
          figures: [],
          isDragging: false,
        };
        const store = getStore(startStore);
        store.setIsDragging(true);
        const expectResult: ICanvasStore = {
          ...store,
          isDragging: true,
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("setResizingType", () => {
      it('should handle success', () => {
        const startStore = {
          figures: [],
          resizingType: EResizeType.DISABLE,
        };
        const store = getStore(startStore);
        store.setResizingType(EResizeType.LEFT_BOT);
        const expectResult: ICanvasStore = {
          ...store,
          resizingType: EResizeType.LEFT_BOT,
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("stopResizing", () => {
      it('should handle success', () => {
        const startStore = {
          figures: [],
          resizingType: EResizeType.LEFT_BOT,
        };
        const store = getStore(startStore);
        store.stopResizing();
        const expectResult: ICanvasStore = {
          ...store,
          resizingType: EResizeType.DISABLE,
        };
        return expect(store).toEqual(expectResult);
      });
    });

    describe("resizeSelectedFigure", () => {
      const startResizeStore: ICanvasStore = {
        figures: [{
          id: 'figure1',
          left: 100,
          top: 100,
          width: 200,
          height: 200,
          type: EFigureType.CIRCLE,
        }],
        width: 800,
        height: 800,
        resizingType: EResizeType.LEFT_TOP,
        selectedFigureId: 'figure1'
      };

      describe("with type LEFT_TOP", () => {
        it("should resize success", () => {
          const store = getStore(startResizeStore);
          store.resizeSelectedFigure(50, 60);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...store.figures[0],
              left: 150,
              top: 160,
              width: 150,
              height: 140,
            }],
          };
          return expect(store).toEqual(expectResult);
        });

        it("should no resize on trying set position lower 0", () => {
          const store = getStore(startResizeStore);
          store.resizeSelectedFigure(-110, -110);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...startResizeStore.figures![0],
            }],
          };
          return expect(store).toEqual(expectResult);
        });

        it("should no resize on trying resize out the box", () => {
          const store = getStore(startResizeStore);
          store.resizeSelectedFigure(600, 600);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...startResizeStore.figures![0],
            }],
          };
          return expect(store).toEqual(expectResult);
        });

        it("should no resize without selected figures", () => {
          const store = getStore({
            ...startResizeStore,
            selectedFigureId: null,
          });
          store.resizeSelectedFigure(1, 1);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...startResizeStore.figures![0],
            }],
          };
          return expect(store).toEqual(expectResult);
        });
      });

      describe("with type LEFT_BOT", () => {
        it("should resize success", () => {
          const store = getStore({
            ...startResizeStore,
            resizingType: EResizeType.LEFT_BOT,
          });
          store.resizeSelectedFigure(50, 60);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...store.figures[0],
              left: 150,
              top: 100,
              width: 150,
              height: 260,
            }],
          };
          return expect(store).toEqual(expectResult);
        });
      });

      describe("with type RIGHT_TOP", () => {
        it("should resize success", () => {
          const store = getStore({
            ...startResizeStore,
            resizingType: EResizeType.RIGHT_TOP,
          });
          store.resizeSelectedFigure(50, 60);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...store.figures[0],
              left: 100,
              top: 160,
              width: 250,
              height: 140,
            }],
          };
          return expect(store).toEqual(expectResult);
        });
      });

      describe("with type RIGHT_BOT", () => {
        it("should resize success", () => {
          const store = getStore({
            ...startResizeStore,
            resizingType: EResizeType.RIGHT_BOT,
          });
          store.resizeSelectedFigure(50, 60);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...store.figures[0],
              left: 100,
              top: 100,
              width: 250,
              height: 260,
            }],
          };
          return expect(store).toEqual(expectResult);
        });
      });

      describe("with type DISABLE", () => {
        it("should no resize", () => {
          const store = getStore({
            ...startResizeStore,
            resizingType: EResizeType.DISABLE,
          });
          store.resizeSelectedFigure(50, 60);
          const expectResult: ICanvasStore = {
            ...store,
            figures: [{
              ...startResizeStore.figures![0],
            }],
          };
          return expect(store).toEqual(expectResult);
        });
      });
    });
  });

  describe("Views", () => {
    describe("isResizing", () => {
      it("should return false with default resize type", () => {
        const store = getStore();
        return expect(store.isResizing).toBeFalsy();
      });
      it("should return false with default resize type", () => {
        const store = getStore({
          figures: [],
          resizingType: EResizeType.LEFT_BOT,
        });
        return expect(store.isResizing).toBeTruthy();
      });
    });
  });
});
