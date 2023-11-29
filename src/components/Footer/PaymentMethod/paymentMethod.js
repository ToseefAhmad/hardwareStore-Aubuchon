import { string } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './paymentMethod.module.css';
import { usePaymentMethod } from './usePaymentMethod';

const ICON_HEIGHT = '30px';
const ICON_WIDTH = '44px';

const PaymentMethod = ({ alt, src }) => {
    const { imgLoaded, setImageLoaded } = usePaymentMethod();

    return (
        <li className={classes.root}>
            <img
                alt={alt}
                src={src}
                height={ICON_HEIGHT}
                width={ICON_WIDTH}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
            />
            {!imgLoaded && (
                <div className={classes.shimmer}>
                    <Shimmer height={ICON_HEIGHT} width={ICON_WIDTH} />
                </div>
            )}
        </li>
    );
};

PaymentMethod.propTypes = {
    alt: string.isRequired,
    src: string.isRequired
};

export default PaymentMethod;
