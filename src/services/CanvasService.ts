import { SnapshotOut } from 'mobx-state-tree';
import { CanvasStore } from '../stores/models/Canvas/Canvas';

class CanvasService {
  private readonly STORAGE_NAME = 'CANVAS';

  public setValue(item: SnapshotOut<typeof CanvasStore>): void {
    window.localStorage.setItem(this.STORAGE_NAME, JSON.stringify(item));
  }

  public getValue(): string | undefined {
    const value = window.localStorage.getItem(this.STORAGE_NAME);
    return value ? JSON.parse(value) : undefined;
  }
}

export const canvasService = new CanvasService();
