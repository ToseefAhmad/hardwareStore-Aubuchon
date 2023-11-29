import { useCallback, useMemo, useReducer } from 'react';

import withLogger from '@magento/peregrine/lib/util/withLogger';

const init = next => (next instanceof Map ? next : new Map());

const reducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case 'clear': {
            return init();
        }
        case 'add item': {
            const { group, item } = payload;
            const nextState = new Map(state);
            const nextSet = new Set(state.get(group));

            nextSet.add(item);
            nextState.set(group, nextSet);

            return nextState;
        }
        case 'remove item': {
            const { group, item } = payload;
            const nextState = new Map(state);
            const nextSet = new Set(state.get(group));

            nextSet.delete(item);

            // if removing an item leaves a group empty, delete that group
            if (nextSet.size) {
                nextState.set(group, nextSet);
            } else {
                nextState.delete(group);
            }

            return nextState;
        }
        case 'toggle item': {
            const { group, item } = payload;
            const nextState = new Map(state);
            const nextSet = new Set(state.get(group));

            if (nextSet.has(item)) {
                nextSet.delete(item);
            } else {
                nextSet.add(item);
            }

            // if removing an item leaves a group empty, delete that group
            if (nextSet.size) {
                nextState.set(group, nextSet);
            } else {
                nextState.delete(group);
            }

            return nextState;
        }
        case 'set items': {
            return init(payload);
        }
        case 'update item': {
            const { group, item } = payload;
            const nextState = new Map(state);
            const nextSet = new Set(state.get(group));

            nextSet.clear();
            nextSet.add(item);
            nextState.set(group, nextSet);

            return nextState;
        }
    }
};

const wrappedReducer = withLogger(reducer);

export const useFilterState = () => {
    const [state, dispatch] = useReducer(wrappedReducer, null, init);

    const addItem = useCallback(payload => {
        dispatch({ payload, type: 'add item' });
    }, []);

    const clear = useCallback(payload => {
        dispatch({ payload, type: 'clear' });
    }, []);

    const removeItem = useCallback(payload => {
        dispatch({ payload, type: 'remove item' });
    }, []);

    const setItems = useCallback(payload => {
        dispatch({ payload, type: 'set items' });
    }, []);

    const toggleItem = useCallback(payload => {
        dispatch({ payload, type: 'toggle item' });
    }, []);

    const updateItem = useCallback(payload => {
        dispatch({ payload, type: 'update item' });
    }, []);

    const api = useMemo(
        () => ({
            addItem,
            clear,
            dispatch,
            removeItem,
            setItems,
            toggleItem,
            updateItem
        }),
        [addItem, clear, dispatch, removeItem, updateItem, setItems, toggleItem]
    );

    return [state, api];
};
