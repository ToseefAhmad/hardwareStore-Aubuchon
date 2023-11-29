import { createContext, useContext } from 'react';

export const OptionsContext = createContext();

export const useOptionsContext = () => useContext(OptionsContext);
