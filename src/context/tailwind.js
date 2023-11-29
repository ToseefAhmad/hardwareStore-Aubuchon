import { node } from 'prop-types';
import React, { createContext, useContext } from 'react';

const TailwindContext = createContext();

/**
 * This component provides data for Tailwind configuration.
 *
 * @return {JSX.Element} A [React context provider]{@link https://reactjs.org/docs/context.html}
 */
const TailwindContextProvider = ({ children }) => {
    return (
        <TailwindContext.Provider value={TAILWIND_CONFIG}>
            {children}
        </TailwindContext.Provider>
    );
};

TailwindContextProvider.propTypes = {
    children: node
};

export default TailwindContextProvider;

export const useTailwindContext = () => useContext(TailwindContext);
