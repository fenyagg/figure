import { destroy, SnapshotIn, types } from 'mobx-state-tree';
import shortid from 'shortid';
import { EFigureType, EResizeType } from './canvas.types';

const Figure = types.model({
  id: types.identifier,
  left: types.number,
  top: types.number,
  width: types.number,
  height: types.number,
  type: types.enumeration(Object.values(EFigureType)),
});

export type IFigure = SnapshotIn<typeof Figure>;

export const CanvasStore = types
  .model({
    figures: types.array(Figure),
    selectedFigureId: types.maybeNull(types.string),
    width: types.optional(types.number, 800),
    height: types.optional(types.number, 600),
    isDragging: types.optional(types.boolean, false),
    resizingType: types.optional(
      types.enumeration(Object.values(EResizeType)),
      EResizeType.DISABLE
    ),
    minFigureWidth: types.optional(types.number, 100),
    minFigureHeight: types.optional(types.number, 100),
    figureTypes: types.optional(
      types.array(types.enumeration(Object.values(EFigureType))),
      Object.values(EFigureType)
    ),
  })
  .actions(self => ({
    addFigure(figureType: EFigureType, width = 150, height = 150) {
      const newFigure = {
        id: shortid(),
        type: figureType,
        width,
        height,
        left: self.width / 2 - width / 2,
        top: self.height / 2 - height / 2,
      };
      self.figures.push(newFigure);
      self.selectedFigureId = newFigure.id;
      return newFigure;
    },

    selectFigure(figureId: string | null) {
      self.selectedFigureId = figureId;
    },

    moveSelectedFigure(changeX: number, changeY: number) {
      const figure: IFigure | undefined = self.figures.find(
        figureItem => figureItem.id === self.selectedFigureId
      );
      if (!figure) {
        return;
      }
      // set position left
      let nextPositionLeft = figure.left + changeX;
      if (nextPositionLeft < 0) {
        nextPositionLeft = 0;
      }
      if (nextPositionLeft > self.width - figure.width) {
        nextPositionLeft = self.width - figure.width;
      }
      figure.left = nextPositionLeft;

      // set position top
      let nextPositionTop = figure.top + changeY;
      if (nextPositionTop < 0) {
        nextPositionTop = 0;
      }
      if (nextPositionTop > self.height - figure.height) {
        nextPositionTop = self.height - figure.height;
      }
      figure.top = nextPositionTop;
    },

    deleteSelectedFigure() {
      const activeFigure = self.figures.find(
        figure => figure.id === self.selectedFigureId
      );
      if (activeFigure) {
        destroy(activeFigure);
        self.selectedFigureId = null;
      }
    },

    setIsDragging(isDragging: boolean) {
      self.isDragging = isDragging;
    },

    setResizingType(type: EResizeType) {
      self.resizingType = type;
    },

    stopResizing() {
      self.resizingType = EResizeType.DISABLE;
    },

    resizeSelectedFigure(changeX: number, changeY: number) {
      const figure: IFigure | undefined = self.figures.find(
        figureItem => figureItem.id === self.selectedFigureId
      );
      if (!figure || (!changeX && !changeY)) {
        return;
      }
      const figureChanges = {
        left: figure.left,
        top: figure.top,
        width: figure.width,
        height: figure.height,
      };
      // set sizes and position based on resize type
      switch (self.resizingType) {
        case EResizeType.LEFT_TOP:
          figureChanges.left += changeX;
          figureChanges.top += changeY;
          figureChanges.width -= changeX;
          figureChanges.height -= changeY;
          break;
        case EResizeType.LEFT_BOT:
          figureChanges.left += changeX;
          figureChanges.width -= changeX;
          figureChanges.height += changeY;
          break;
        case EResizeType.RIGHT_TOP:
          figureChanges.top += changeY;
          figureChanges.width += changeX;
          figureChanges.height -= changeY;
          break;
        case EResizeType.RIGHT_BOT:
          figureChanges.width += changeX;
          figureChanges.height += changeY;
          break;
        case EResizeType.DISABLE:
          return;
      }
      // save figure in canvas and save min size
      if (
        figureChanges.left < 0 ||
        figureChanges.top < 0 ||
        figureChanges.left + figureChanges.width > self.width ||
        figureChanges.top + figureChanges.height > self.height ||
        figureChanges.width < self.minFigureWidth ||
        figureChanges.height < self.minFigureHeight
      ) {
        return;
      }
      // update figure
      figure.left = figureChanges.left;
      figure.top = figureChanges.top;
      figure.width = figureChanges.width;
      figure.height = figureChanges.height;
    },
  }))
  .views(self => ({
    get isResizing() {
      return self.resizingType !== EResizeType.DISABLE;
    },
  }));
