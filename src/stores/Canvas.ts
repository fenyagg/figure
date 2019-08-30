import { destroy, SnapshotIn, types } from 'mobx-state-tree';
import shortid from 'shortid';

const Figure = types.model({
  id: types.identifier,
  positionLeft: types.optional(types.number, 0),
  positionTop: types.optional(types.number, 0),
  width: types.optional(types.number, 150),
  height: types.optional(types.number, 150),
  type: types.string,
});

export type IFigure = SnapshotIn<typeof Figure>;

export const CanvasStore = types
  .model({
    figures: types.array(Figure),
    activeFigureId: types.maybeNull(types.string),
    width: types.number,
    height: types.number,
  })
  .actions(self => ({
    addFigure(figureType: string, width: number, height: number) {
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
        const nextPositionLeft = figure.positionLeft + changeX;
        if (
          nextPositionLeft > 0 &&
          nextPositionLeft + figure.width < self.width
        ) {
          figure.positionLeft = nextPositionLeft;
        }

        // set position top
        const nextPositionTop = figure.positionTop + changeY;
        if (
          nextPositionTop > 0 &&
          nextPositionTop + figure.height < self.height
        ) {
          figure.positionTop = nextPositionTop;
        }
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
  }));
