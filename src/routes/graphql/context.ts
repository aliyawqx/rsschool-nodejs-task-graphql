import { createUserSubsLoader } from './loader.js';

export function createContext() {
  return {
    loaders: {
      userSubsLoader: createUserSubsLoader(),
    },
  };
}

export type ContextType = ReturnType<typeof createContext>;
