import { useCallback } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

/**
 * Returns props necessary to render a CategoryBranch component.
 *
 * @param {object} props
 * @param {object} props.category - category data
 * @param {string} props.category.id - category id
 * @param {boolean} props.category.include_in_menu - whether to show category
 * @param {function} props.setCategoryId - callback that updates categoryId
 * @return {{ exclude: boolean, handleClick: function }}
 */
export const useCategoryBranch = props => {
    const { category, setCategoryId } = props;
    const { uid: id, include_in_menu } = category;
    const [, { dispatch }] = useEventingContext();

    // `include_in_menu` is undefined when Magento <= 2.3.1
    const exclude = include_in_menu === 0;

    const handleClick = useCallback(() => {
        setCategoryId(id);

        dispatch({
            type: 'CATEGORY_NAVIGATION_CLICK',
            payload: category
        });
    }, [category, dispatch, id, setCategoryId]);

    return { exclude, handleClick };
};
