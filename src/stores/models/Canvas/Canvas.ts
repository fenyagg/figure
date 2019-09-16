import { destroy, SnapshotIn, types } from 'mobx-state-tree';
import shortid from 'shortid';
import { EFigureType, EResizeType } from './canvas.types';

export const Figure = types.model({
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
  .views(self => ({
    get isResizing() {
      return self.resizingType !== EResizeType.DISABLE;
    },
    get selectedFigure() {
      return self.figures.find(
        figureItem => figureItem.id === self.selectedFigureId
      );
    },
  }))
  .views(self => ({
    get activeDotPosition() {
      if (!self.selectedFigure) {
        return undefined;
      }
      switch (self.resizingType) {
        case EResizeType.LEFT_TOP:
          return {
            x: self.selectedFigure.left,
            y: self.selectedFigure.top,
          };
        case EResizeType.LEFT_BOT:
          return {
            x: self.selectedFigure.left,
            y: self.selectedFigure.top + self.selectedFigure.height,
          };
        case EResizeType.RIGHT_TOP:
          return {
            x: self.selectedFigure.left + self.selectedFigure.width,
            y: self.selectedFigure.top,
          };
        case EResizeType.RIGHT_BOT:
          return {
            x: self.selectedFigure.left + self.selectedFigure.width,
            y: self.selectedFigure.top + self.selectedFigure.height,
          };
      }
    },
  }))
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
      if (!self.selectedFigure) {
        return;
      }
      // set position left
      let nextPositionLeft = self.selectedFigure.left + changeX;
      if (nextPositionLeft < 0) {
        nextPositionLeft = 0;
      }
      if (nextPositionLeft > self.width - self.selectedFigure.width) {
        nextPositionLeft = self.width - self.selectedFigure.width;
      }
      self.selectedFigure.left = nextPositionLeft;

      // set position top
      let nextPositionTop = self.selectedFigure.top + changeY;
      if (nextPositionTop < 0) {
        nextPositionTop = 0;
      }
      if (nextPositionTop > self.height - self.selectedFigure.height) {
        nextPositionTop = self.height - self.selectedFigure.height;
      }
      self.selectedFigure.top = nextPositionTop;
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

    startDragging() {
      self.isDragging = true;
    },

    stopDragging() {
      self.isDragging = false;
    },

    setResizingType(type: EResizeType) {
      self.resizingType = type;
    },

    stopResizing() {
      self.resizingType = EResizeType.DISABLE;
    },

    resizeSelectedFigure(changeX: number, changeY: number) {
      if (!self.selectedFigure || (!changeX && !changeY)) {
        return;
      }
      const figureChanges = {
        left: self.selectedFigure.left,
        top: self.selectedFigure.top,
        width: self.selectedFigure.width,
        height: self.selectedFigure.height,
      };

      const resizeFigure = (
        leftFactor: number,
        topFactor: number,
        widthFactor: number,
        heightFactor: number
      ) => {
        figureChanges.left += changeX * leftFactor;
        figureChanges.top += changeY * topFactor;
        figureChanges.width += changeX * widthFactor;
        figureChanges.height += changeY * heightFactor;

        // if out left
        if (figureChanges.left < 0) {
          figureChanges.width += figureChanges.left;
          figureChanges.left = 0;
        }

        // if out right
        if (figureChanges.left + figureChanges.width > self.width) {
          figureChanges.width = self.width - figureChanges.left;
        }

        // if out top
        if (figureChanges.top < 0) {
          figureChanges.height += figureChanges.top;
          figureChanges.top = 0;
        }

        // if out bot
        if (figureChanges.top + figureChanges.height > self.height) {
          figureChanges.height = self.height - figureChanges.top;
        }

        // if less than min width
        if (figureChanges.width < self.minFigureWidth) {
          const diffMinWidth = self.minFigureWidth - figureChanges.width;
          // back changes to min
          figureChanges.width = self.minFigureWidth;
          figureChanges.left += diffMinWidth * leftFactor * -1;
        }

        // if less than min height
        if (figureChanges.height < self.minFigureHeight) {
          const diffMinHeight = self.minFigureHeight - figureChanges.height;
          // back changes to min
          figureChanges.height = self.minFigureHeight;
          figureChanges.top += diffMinHeight * topFactor * -1;
        }

        // update figure
        self.selectedFigure!.left = figureChanges.left;
        self.selectedFigure!.top = figureChanges.top;
        self.selectedFigure!.width = figureChanges.width;
        self.selectedFigure!.height = figureChanges.height;
      };

      // set sizes and position based on resize type
      switch (self.resizingType) {
        case EResizeType.LEFT_TOP:
          resizeFigure(1, 1, -1, -1);
          break;
        case EResizeType.LEFT_BOT:
          resizeFigure(1, 0, -1, 1);
          break;
        case EResizeType.RIGHT_TOP:
          resizeFigure(0, 1, 1, -1);
          break;
        case EResizeType.RIGHT_BOT:
          resizeFigure(0, 0, 1, 1);
          break;
        case EResizeType.DISABLE:
          return;
      }
    },
  }));
