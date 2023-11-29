import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import Icon from '@app/components/Icon';
import { ChevronLeftMenu } from '@app/components/Icons';
import Link from '@app/components/Link';
import NoticeBanner from '@app/components/NoticeBanner';

import classes from './checkoutHeader.module.css';
import CheckoutHeaderShimmer from './checkoutHeader.shimmer';
import { useCheckoutHeader } from './useCheckoutHeader';

const CheckoutHeader = () => {
    const { brand, handleBackButtonClick } = useCheckoutHeader();

    if (!brand) return <CheckoutHeaderShimmer />;

    return (
        <header>
            <NoticeBanner />
            <div className={classes.root}>
                <button
                    className={classes.iconButton}
                    type="button"
                    aria-label="Back button"
                    onClick={handleBackButtonClick}
                >
                    <Icon
                        classes={{ icon: classes.chevronIcon }}
                        src={ChevronLeftMenu}
                    />
                </button>
                <Link to={APP_ROUTER_PATHS.home}>
                    <Image
                        classes={{
                            container: classes.imageContainer
                        }}
                        src={brand.logo}
                        alt={brand.name}
                    />
                </Link>
            </div>
        </header>
    );
};

export default CheckoutHeader;
