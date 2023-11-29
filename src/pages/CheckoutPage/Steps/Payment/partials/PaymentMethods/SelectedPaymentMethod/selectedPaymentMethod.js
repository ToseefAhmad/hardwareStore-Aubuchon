import classnames from 'classnames';
import React from 'react';

import isObjectEmpty from '@magento/venia-ui/lib/util/isObjectEmpty';

import { PAYMENT_FORM_FIELDS } from '../../../constants';

import RadioGroup from '@app/components/RadioGroup';
import Radio from '@app/components/RadioGroup/radio';
import {
    CARD_TYPE_MAPPER,
    CARD_IMAGE_MAPPER
} from '@app/utils/creditCardUtils';

import classes from './selectedPaymentMethod.module.css';
import { useSelectedPaymentMethod } from './useSelectedPaymentMethod';

const SelectedPaymentMethod = () => {
    const { selectedPaymentMethod, fieldValue } = useSelectedPaymentMethod();

    const { details } = selectedPaymentMethod || {};

    return (
        <div className={classes.root}>
            <RadioGroup field={PAYMENT_FORM_FIELDS.selectedPaymentMethod}>
                <Radio
                    key="isSelectedPaymentMethod"
                    id="isSelectedPaymentMethod"
                    value={fieldValue || ''}
                    classes={{
                        root: classnames(classes.radioContainer),
                        background: classes.background
                    }}
                >
                    {details && !isObjectEmpty(details) && (
                        <span className={classes.container}>
                            <span className={classes.title}>
                                <span className={classes.type}>
                                    {CARD_TYPE_MAPPER[details.type]}
                                </span>
                                <span className={classes.text}>
                                    ending {details.maskedCC}, expiration date{' '}
                                    {details.expirationDate}
                                </span>
                            </span>
                            <span className={classes.logo}>
                                {CARD_TYPE_MAPPER[details.type] ? (
                                    <img
                                        src={CARD_IMAGE_MAPPER[details.type]}
                                        alt={details.type}
                                        className={classes.image}
                                    />
                                ) : (
                                    <div className={classes.placeholder} />
                                )}
                            </span>
                        </span>
                    )}
                </Radio>
            </RadioGroup>
        </div>
    );
};

export default SelectedPaymentMethod;
