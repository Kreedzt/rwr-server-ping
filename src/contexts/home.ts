import { createContext } from 'solid-js';
import { StoreModel } from '../model/store';

export interface IHomeContextValue {
  configStore: StoreModel;
}

export const HomeContext = createContext<IHomeContextValue>({} as any);
