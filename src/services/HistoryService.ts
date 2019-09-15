import { ICanvasHistory } from '../stores/models/History/History';

class HistoryService {
  private readonly STORAGE_NAME = 'CANVAS';

  public saveSnap(item: ICanvasHistory): void {
    window.localStorage.setItem(this.STORAGE_NAME, JSON.stringify(item));
  }

  public getSnap(): ICanvasHistory | {} {
    const value = window.localStorage.getItem(this.STORAGE_NAME);
    return value ? JSON.parse(value) : {};
  }
}

export const historyService = new HistoryService();
