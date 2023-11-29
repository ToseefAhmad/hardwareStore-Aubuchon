import {
    arrayOf,
    node,
    number,
    oneOfType,
    shape,
    string,
    bool,
    func
} from 'prop-types';
import React, { Suspense, useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const Select = React.lazy(() => import('./select'));

const SelectLazy = props => {
    const { innerWidth } = useWindowSize();

    const SelectShimmer = useMemo(
        () => (
            <Shimmer
                height={`${innerWidth >= 768 ? 56 : 50}px`}
                width={'100%'}
            />
        ),
        [innerWidth]
    );

    return (
        <Suspense fallback={SelectShimmer}>
            <Select {...props} />
        </Suspense>
    );
};

SelectLazy.propTypes = {
    classes: shape({
        root: string,
        select: string,
        input: string,
        input_error: string,
        chevron: string
    }),
    field: string.isRequired,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node,
    isSearchable: bool,
    onChangeInformed: func,
    onChangeReactSelect: func,
    placeholder: string
};

export default SelectLazy;
