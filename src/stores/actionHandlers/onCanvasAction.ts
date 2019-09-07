import { getPath, getSnapshot, ISerializedActionCall } from 'mobx-state-tree';
import { store } from '../index';
import { EResizeType } from '../models/Canvas/canvas.types';

export const onCanvasAction = (call: ISerializedActionCall) => {
  if (getPath(store.canvas) === call.path) {
    const canvasSnap = getSnapshot(store.canvas);
    // don't save snapshots when dragging and resizing (too match)
    if (
      !canvasSnap.isDragging &&
      canvasSnap.resizingType === EResizeType.DISABLE
    ) {
      store.history.addSnapShot(canvasSnap);
    }
  }
};
