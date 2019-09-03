import { destroy, SnapshotIn, types } from 'mobx-state-tree';
import shortid from 'shortid';

const Figure = types.model({
  id: types.identifier,
  positionLeft: types.optional(types.number, 0),
  positionTop: types.optional(types.number, 0),
  width: types.number,
  height: types.number,
  type: types.string,
});

export type IFigure = SnapshotIn<typeof Figure>;

const DragPosition = types.model({
  x: types.number,
  y: types.number,
});

export const CanvasStore = types
  .model({
    figures: types.array(Figure),
    activeFigureId: types.maybeNull(types.string),
    width: types.number,
    height: types.number,
    isDragging: types.optional(types.boolean, false),
    dragPosition: types.optional(DragPosition, {
      x: 0,
      y: 0,
    }),
    isResizing: types.optional(types.boolean, false),
  })
  .actions(self => ({
    addFigure(figureType: string, width = 150, height = 150) {
      const newFigure = {
        id: shortid(),
        type: figureType,
        width,
        height,
        positionLeft: self.width / 2 - width / 2,
        positionTop: self.height / 2 - height / 2,
      };
      self.figures.push(newFigure);
      this.setActiveFigure(newFigure.id);
      return newFigure;
    },

    setActiveFigure(figureId: string | null) {
      self.activeFigureId = figureId;
    },

    moveFigure(changeX: number, changeY: number) {
      const figureIndex = self.figures.findIndex(
        figure => figure.id === self.activeFigureId
      );
      if (figureIndex > -1) {
        const figure = self.figures[figureIndex];

        // set position left
        let nextPositionLeft = figure.positionLeft + changeX;
        if (nextPositionLeft < 0) {
          nextPositionLeft = 0;
        }
        if (nextPositionLeft > self.width - figure.width) {
          nextPositionLeft = self.width - figure.width;
        }
        figure.positionLeft = nextPositionLeft;

        // set position top
        let nextPositionTop = figure.positionTop + changeY;
        if (nextPositionTop < 0) {
          nextPositionTop = 0;
        }
        if (nextPositionTop > self.height - figure.height) {
          nextPositionTop = self.height - figure.height;
        }
        figure.positionTop = nextPositionTop;
      }
    },

    deleteActiveFigure() {
      const activeFigure = self.figures.find(
        figure => figure.id === self.activeFigureId
      );
      if (activeFigure) {
        destroy(activeFigure);
      }
    },

    setIsDragging(isDragging: boolean) {
      self.isDragging = isDragging;
    },

    setDragPosition(x: number, y: number) {
      self.dragPosition.x = x;
      self.dragPosition.y = y;
    },

    setIsResizing(isResizing: boolean) {
      self.isResizing = isResizing;
    },
  }));
