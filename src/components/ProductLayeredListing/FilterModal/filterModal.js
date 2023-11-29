import React, { lazy, Suspense } from 'react';

import SimpleModal from '@app/components/SimpleModal';
import { MODAL_NAMES } from '@app/components/SimpleModal/constants';

import FilterModalShimmer from './filterModal.shimmer';

const Content = lazy(() => import('./content'));

const FilterModal = () => {
    return (
        <SimpleModal fullHeight={false} modalName={MODAL_NAMES.filter}>
            <Suspense fallback={<FilterModalShimmer />}>
                <Content />
            </Suspense>
        </SimpleModal>
    );
};

export default FilterModal;
