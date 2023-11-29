import { bool } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';

import AddressCard from './AddressCard';
import classes from './billingAddress.module.css';
import BillingAddressForm from './Form';
import { useBillingAddress } from './useBillingAddress';

const BillingAddress = ({ disabled }) => {
    const {
        isFormShown,
        toggleIsShownForm,
        autoSelectedAddress
    } = useBillingAddress();

    return (
        <section className={classes.root}>
            {!isFormShown ? (
                <>
                    <AddressCard autoSelectedAddress={autoSelectedAddress} />
                    <Button
                        classes={{
                            secondary: classes.button
                        }}
                        onClick={toggleIsShownForm}
                    >
                        Change Address
                    </Button>
                </>
            ) : (
                <BillingAddressForm disabled={disabled} />
            )}
        </section>
    );
};

BillingAddress.propTypes = {
    disabled: bool
};

export default BillingAddress;
