import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useWindowSize } from '@magento/peregrine';
import { Meta, StoreTitle } from '@magento/venia-ui/lib/components/Head';
import RichText from '@magento/venia-ui/lib/components/RichText';

import Button from '@app/components/Button';
import { useTailwindContext } from '@app/context/tailwind';

import { DESKTOP_VIDEO, MOBILE_VIDEO } from './constants';
import Heading from './Heading';
import classes from './tryCurbsidePage.module.css';
import { useTryCurbsidePage } from './useTryCurbsidePage';

const TryCurbsidePage = () => {
    const {
        isSignedIn,
        handleOpenAuthModal,
        meta_title,
        meta_description
    } = useTryCurbsidePage();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <>
            <StoreTitle>{meta_title}</StoreTitle>
            <Meta name="title" content={meta_title} />
            <Meta name="description" content={meta_description} />
            <div className={classes.root}>
                <div className={classes.textContainer}>
                    <Heading />
                    <p className={classes.title}>
                        Errands are easy with Curbside
                    </p>
                    <p>
                        Give it a try{' '}
                        <span className={classes.discount}>- 15% off</span> your
                        first HardwareStore.com order!*
                    </p>
                    {!isSignedIn && (
                        <div className={classes.buttonWrapper}>
                            <Button
                                priority="high"
                                classes={{ tall: classes.button }}
                                onClick={handleOpenAuthModal}
                            >
                                Register First, then Shop
                            </Button>
                        </div>
                    )}
                </div>
                <Helmet>
                    <script
                        src="https://fast.wistia.com/assets/external/E-v1.js"
                        async
                    />
                </Helmet>
                <RichText content={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO} />
                <p className={classes.finePrint}>
                    *15% off applies only to your first HardwareStore.com order
                    with a max savings of $45. Excludes Honda, Stihl, Husqvarna,
                    Scotts 4 Step Program and all wood pellet purchases. You
                    must register your account to get this offer. Discount will
                    be auto-applied during checkout. This offer is subject to
                    change without notice.
                </p>
            </div>
        </>
    );
};

export default TryCurbsidePage;
