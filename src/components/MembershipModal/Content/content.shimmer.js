import { oneOf } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import {
    APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY,
    APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY
} from '@app/constants';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './content.shimmer.module.css';

const MOBILE_MAIN_BLOCK_HEIGHT = {
    [APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY]: '365px',
    [APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY]: '420px'
};

const MAIN_BLOCK_HEIGHT = {
    [APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY]: '421px',
    [APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY]: '515px'
};

const MembershipModalContentShimmer = ({ initialTabKey }) => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return (
        <>
            <header className={classes.header}>
                <Shimmer width="100%" height="34px" />
            </header>
            <div className={classes.main}>
                <Shimmer
                    width="100%"
                    height={
                        isMobile
                            ? MOBILE_MAIN_BLOCK_HEIGHT[initialTabKey]
                            : MAIN_BLOCK_HEIGHT[initialTabKey]
                    }
                />
            </div>
        </>
    );
};

MembershipModalContentShimmer.propTypes = {
    initialTabKey: oneOf([
        APP_MEMBERSHIP_MODAL_OFFERS_TAB_KEY,
        APP_MEMBERSHIP_MODAL_REWARDS_TAB_KEY
    ]).isRequired
};

export default MembershipModalContentShimmer;
