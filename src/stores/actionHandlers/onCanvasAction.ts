import { getSnapshot } from 'mobx-state-tree';
import { ELocalstorageKeys } from '../../entries/ELocalstorageKeys';
import { store } from '../index';
import { EResizeType } from '../models/Canvas/canvas.types';

export const onCanvasAction = () => {
  const canvasSnap = getSnapshot(store.canvas);
  // don't save snapshots when dragging and resizing (too match)
  if (
    !canvasSnap.isDragging &&
    canvasSnap.resizingType === EResizeType.DISABLE
  ) {
    store.history.addSnapShot(canvasSnap);
    window.localStorage.setItem(
      ELocalstorageKeys.CANVAS,
      JSON.stringify(canvasSnap)
    );
  }
};
