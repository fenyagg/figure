import { destroy, SnapshotIn, types } from 'mobx-state-tree';
import shortid from 'shortid';
import { EResizeType } from './canvas.types';

const Figure = types.model({
  id: types.identifier,
  positionLeft: types.optional(types.number, 0),
  positionTop: types.optional(types.number, 0),
  width: types.number,
  height: types.number,
  type: types.string,
});

export type IFigure = SnapshotIn<typeof Figure>;

export const CanvasStore = types
  .model({
    figures: types.array(Figure),
    activeFigureId: types.maybeNull(types.string),
    width: types.number,
    height: types.number,
    isDragging: types.optional(types.boolean, false),
    resizingType: types.optional(
      types.enumeration(Object.values(EResizeType)),
      EResizeType.DISABLE
    ),
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
      const figure: IFigure | undefined = self.figures.find(
        figureItem => figureItem.id === self.activeFigureId
      );
      if (!figure) {
        return;
      }
      // set position left
      let nextPositionLeft = figure.positionLeft! + changeX;
      if (nextPositionLeft < 0) {
        nextPositionLeft = 0;
      }
      if (nextPositionLeft > self.width - figure.width) {
        nextPositionLeft = self.width - figure.width;
      }
      figure.positionLeft = nextPositionLeft;

      // set position top
      let nextPositionTop = figure.positionTop! + changeY;
      if (nextPositionTop < 0) {
        nextPositionTop = 0;
      }
      if (nextPositionTop > self.height - figure.height) {
        nextPositionTop = self.height - figure.height;
      }
      figure.positionTop = nextPositionTop;
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

    setResizingType(type: EResizeType) {
      self.resizingType = type;
    },

    resizeFigure(changeX: number, changeY: number) {
      const figure: IFigure | undefined = self.figures.find(
        figureItem => figureItem.id === self.activeFigureId
      );
      const unitChange =
        Math.abs(changeX) > Math.abs(changeY) ? changeX : changeY;
      if (!figure || !unitChange) {
        return;
      }
      switch (self.resizingType) {
        case EResizeType.LEFT_TOP:
          const figureChanges = {
            left: figure.positionLeft! + unitChange,
            top: figure.positionTop! + unitChange,
            width: figure.width - unitChange,
            height: figure.width - unitChange,
          };
          if (figureChanges.left < 0 || figureChanges.top < 0) {
            return;
          }
          figure.positionLeft = figureChanges.left;
          figure.positionTop = figureChanges.top;
          figure.width = figureChanges.width;
          figure.height = figureChanges.height;
          break;
      }
    },
  }))
  .views(self => ({
    get isResizing() {
      return self.resizingType !== EResizeType.DISABLE;
    },
  }));
