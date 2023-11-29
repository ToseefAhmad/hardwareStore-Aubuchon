import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import PaymentMethod from '@app/components/Footer/PaymentMethod';
import {
    CARD_TYPE_MAPPER,
    CARD_IMAGE_MAPPER
} from '@app/utils/creditCardUtils';

import defaultClasses from './supportedPaymentMethods.module.css';

const items = [
    { alt: CARD_TYPE_MAPPER.VI, src: CARD_IMAGE_MAPPER.VI },
    { alt: CARD_TYPE_MAPPER.MC, src: CARD_IMAGE_MAPPER.MC },
    { alt: CARD_TYPE_MAPPER.DI, src: CARD_IMAGE_MAPPER.DI },
    {
        alt: CARD_TYPE_MAPPER.AE,
        src: CARD_IMAGE_MAPPER.AE
    }
];

const SupportedPaymentMethods = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <span className={classes.title}>We Accept:</span>
            <ul className={classes.imageList}>
                {items.map(item => (
                    <PaymentMethod
                        key={item.alt}
                        alt={item.alt}
                        src={item.src}
                    />
                ))}
            </ul>
        </div>
    );
};

SupportedPaymentMethods.propTypes = {
    classes: shape({
        root: string
    })
};

export default SupportedPaymentMethods;
