import { arrayOf, func, number, shape, string } from 'prop-types';

import setValidator from '@magento/peregrine/lib/validators/set';

export const filterPropTypes = {
    filterApi: shape({
        toggleItem: func.isRequired,
        updateItem: func.isRequired
    }).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    items: arrayOf(
        shape({
            count: number,
            title: string,
            value: string
        })
    ),
    onApply: func
};
