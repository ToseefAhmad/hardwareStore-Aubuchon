import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { PAYMENT_FORM_FIELDS } from '../../../../constants';

import Select from '@app/components/Select';

import classes from './braintreePayment.module.css';
import BraintreeForm from './Form';
import { useBraintreePayment } from './useBraintreePayment';

const BraintreePayment = () => {
    const {
        mappedPaymentMethods,
        showCreditCardForm,
        showCreditCardSelect
    } = useBraintreePayment();

    return (
        <>
            {showCreditCardSelect && (
                <>
                    <fieldset className={classes.root}>
                        <p className={classes.label}>Select credit card</p>
                        {!mappedPaymentMethods?.length && (
                            <div className={classes.selectShimmer}>
                                <Shimmer width="100%" height="100%" />
                            </div>
                        )}
                        {mappedPaymentMethods?.length && (
                            <Select
                                field={
                                    PAYMENT_FORM_FIELDS.selectedPaymentMethod
                                }
                                items={[...mappedPaymentMethods]}
                            />
                        )}
                    </fieldset>
                </>
            )}
            {showCreditCardForm && <BraintreeForm />}
        </>
    );
};

export default BraintreePayment;
