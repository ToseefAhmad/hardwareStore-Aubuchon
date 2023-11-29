import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import UserwayWidget from '@app/components/Footer/UserwayWidget';
import Icon from '@app/components/Icon';
import { Lock } from '@app/components/Icons';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './checkoutFooter.module.css';
import GoogleRating from './GoogleRating';
import PaymentMethods from './PaymentMethods';

const CheckoutFooter = () => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    return (
        <footer className={classes.root}>
            <div className={classes.ratingBlock}>
                <GoogleRating />
                {!isMobile && <UserwayWidget />}
            </div>
            <div className={classes.paymentBlock}>
                <PaymentMethods />
            </div>
            <div className={classes.secureBlock}>
                <p className={classes.secureBlockParagraph}>
                    <Icon
                        classes={{ icon: classes.secureBlockIcon }}
                        src={Lock}
                    />
                    Your information is secure
                </p>
            </div>
            {isMobile && (
                <div className={classes.userwayWidget}>
                    <UserwayWidget />
                </div>
            )}
        </footer>
    );
};

export default CheckoutFooter;
