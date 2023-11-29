import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useTailwindContext } from '@app/context/tailwind';
import { useUserContext } from '@app/context/user';

const SignInBannerShimmer = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const [{ isSignedIn }] = useUserContext();

    if (isSignedIn) {
        return null;
    }

    return (
        <>
            <Shimmer width="100%" height={isMobile ? '240px' : '90px'} />
        </>
    );
};

export default SignInBannerShimmer;
