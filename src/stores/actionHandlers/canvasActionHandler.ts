import { getPath, getSnapshot, ISerializedActionCall } from 'mobx-state-tree';
import { store } from '../index';

const actionList = [
  'addFigure',
  'deleteSelectedFigure',
  'stopDragging',
  'stopResizing',
];

export const canvasActionHandler = (call: ISerializedActionCall) => {
  if (getPath(store.canvas) === call.path && actionList.includes(call.name)) {
    const canvasSnap = getSnapshot(store.canvas);
    store.history.addSnapShot(canvasSnap);
  }
};
