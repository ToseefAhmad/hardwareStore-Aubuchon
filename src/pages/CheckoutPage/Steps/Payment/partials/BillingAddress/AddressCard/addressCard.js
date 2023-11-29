import { object } from 'prop-types';
import React from 'react';

import Field from '@app/components/Field';
import Select from '@app/components/Select/select.lazy';
import { PAYMENT_FORM_FIELDS } from '@app/pages/CheckoutPage/Steps/Payment/constants';

import classes from './addressCard.module.css';
import { useAddressCard } from './useAddressCard';

const AddressCard = ({ autoSelectedAddress }) => {
    const { addressCardConfig } = useAddressCard({ autoSelectedAddress });

    return (
        <section className={classes.root}>
            {addressCardConfig.map(({ label, value }) => (
                <dl key={`${label}_${value}`} className={classes.dl}>
                    <dt className={classes.dt}>{label}:</dt>
                    <dd className={classes.dd}>{value}</dd>
                </dl>
            ))}
            <div className={classes.input}>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingCustomerAddresses}
                    label="Select address"
                >
                    <Select
                        field={PAYMENT_FORM_FIELDS.billingCustomerAddresses}
                        items={[
                            {
                                key: autoSelectedAddress.id,
                                label: `${autoSelectedAddress.city}, ${
                                    autoSelectedAddress.region.region_code
                                }`,
                                value: autoSelectedAddress.id
                            }
                        ]}
                    />
                </Field>
            </div>
        </section>
    );
};

AddressCard.propTypes = {
    autoSelectedAddress: object
};

export default AddressCard;
