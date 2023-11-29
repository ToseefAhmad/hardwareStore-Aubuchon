import { useCallback } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

/**
 * Returns props necessary to render a CategoryLeaf component.
 *
 * @param {object} props
 * @param {function} props.onNavigate - callback to fire on link click
 * @return {{ handleClick: function }}
 */
export const useCategoryLeaf = props => {
    const { category, onNavigate } = props;
    const [, { dispatch }] = useEventingContext();

    const handleClick = useCallback(() => {
        onNavigate();

        dispatch({
            type: 'CATEGORY_NAVIGATION_CLICK',
            payload: category
        });
    }, [category, dispatch, onNavigate]);

    return {
        handleClick
    };
};
