import { createContext, useContext } from 'react';

export const ProductLayeredListingContext = createContext();

export const useProductLayeredListingContext = () =>
    useContext(ProductLayeredListingContext);
