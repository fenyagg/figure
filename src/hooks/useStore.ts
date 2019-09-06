import { useContext } from 'react';
import { IStore, StoreContext } from 'stores';

export const useStore = (): IStore => {
  return useContext(StoreContext);
};
