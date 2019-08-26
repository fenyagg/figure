import { types } from 'mobx-state-tree';
import shortid from 'shortid';

const Figure = types.model({
  id: types.maybeNull(types.string),
  positionLeft: types.optional(types.number, 0),
  positionTop: types.optional(types.number, 0),
  width: types.optional(types.number, 150),
  height: types.optional(types.number, 150),
  type: types.string,
});

export const CanvasStore = types
  .model({
    figures: types.array(Figure),
    activeFigureId: types.maybe(types.string),
  })
  .actions(self => ({
    addFigure(figureType: string) {
      self.figures.push({
        id: shortid(),
        type: figureType,
      });
    },
  }));
