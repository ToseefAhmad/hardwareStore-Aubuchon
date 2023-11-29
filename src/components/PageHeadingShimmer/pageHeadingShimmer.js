import { string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';

const PageHeadingShimmer = ({ width }) => {
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    return (
        <Shimmer
            width={width || (isMobile ? '150px' : '180px')}
            height={isMobile ? '38px' : '46px'}
        />
    );
};

PageHeadingShimmer.propTypes = {
    width: string
};

export default PageHeadingShimmer;
