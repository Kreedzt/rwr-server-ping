import { createContext } from 'solid-js';

export interface IHomeContext {
  showMessage: (
    type: 'success' | 'error' | 'warn' | 'info',
    msg: string
  ) => void;
}

export const HomeContext = createContext<IHomeContext>({
  showMessage: () => {
    //
  },
});
