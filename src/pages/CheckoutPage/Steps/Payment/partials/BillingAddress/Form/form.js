import { Relevant } from 'informed';
import { bool } from 'prop-types';
import React from 'react';

import combineValidators from '@magento/venia-ui/lib/util/combineValidators';

import {
    CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE,
    PAYMENT_FORM_FIELDS
} from '../../../constants';

import Checkbox from '@app/components/Checkbox';
import Field from '@app/components/Field';
import Region from '@app/components/Region2';
import Select from '@app/components/Select';
import TextInput from '@app/components/TextInput';
import {
    isPhone,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './form.module.css';
import { useForm } from './useForm';

const BillingAddressForm = ({ disabled }) => {
    const {
        isFormPrefilledAndDisabled,
        countries,
        customerAddresses,
        handleChangeCustomerAddress
    } = useForm();

    return (
        <div className={classes.root}>
            <div className={classes.fields}>
                <Relevant when={() => customerAddresses.length > 1}>
                    <Field
                        id={PAYMENT_FORM_FIELDS.billingCustomerAddresses}
                        label="Select address"
                    >
                        <Select
                            field={PAYMENT_FORM_FIELDS.billingCustomerAddresses}
                            items={customerAddresses}
                            isSearchable
                            onChangeInformed={handleChangeCustomerAddress}
                            onChangeReactSelect={handleChangeCustomerAddress}
                            disabled={disabled}
                        />
                    </Field>
                </Relevant>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingFirstName}
                    label="First Name"
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingFirstName}
                        autoComplete="billing given-name"
                        validate={isRequired}
                        placeholder="Enter first Name"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingLastName}
                    label="Last Name"
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingLastName}
                        autoComplete="billing family-name"
                        validate={isRequired}
                        placeholder="Enter last Name"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingCompany}
                    label="Company"
                    optional
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingCompany}
                        autoComplete="billing organization"
                        placeholder="Enter company name"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingTelephone}
                    label="Phone Number"
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingTelephone}
                        autoComplete="billing tel"
                        validate={combineValidators([isRequired, isPhone])}
                        formatter={phoneFormatter}
                        parser={phoneParser}
                        placeholder="Enter phone number"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingStreet}
                    label="Street Address"
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingStreet}
                        autoComplete="billing address-line1"
                        validate={isRequired}
                        placeholder="Enter Your Street Address"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field id={PAYMENT_FORM_FIELDS.billingCity} label="City">
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingCity}
                        autoComplete="billing address-level2"
                        validate={isRequired}
                        placeholder="Enter City"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingRegionCode}
                    label="State / Province / Region"
                >
                    <Region
                        field={PAYMENT_FORM_FIELDS.billingRegionCode}
                        autoComplete="billing address-level1"
                        countyField={PAYMENT_FORM_FIELDS.billingCountryCode}
                        validate={isRequired}
                        countries={countries}
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingPostCode}
                    label="ZIP/Postal Code"
                >
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingPostCode}
                        autoComplete="billing postal-code"
                        validate={isRequired}
                        placeholder="Enter ZIP/Postal Code"
                        disabled={isFormPrefilledAndDisabled || disabled}
                    />
                </Field>
                <Field
                    id={PAYMENT_FORM_FIELDS.billingCountryName}
                    label="Country"
                    classes={{
                        root: classes.lastFieldRoot
                    }}
                >
                    <TextInput
                        classes={{ root: classes.hiddenInput }}
                        field={PAYMENT_FORM_FIELDS.billingCountryCode}
                        validate={isRequired}
                        disabled
                    />
                    <TextInput
                        field={PAYMENT_FORM_FIELDS.billingCountryName}
                        validate={isRequired}
                        disabled
                    />
                </Field>
            </div>
            <Relevant
                when={({ values }) =>
                    values[PAYMENT_FORM_FIELDS.billingCustomerAddresses] ===
                    CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE
                }
                relevanceWhen={[PAYMENT_FORM_FIELDS.billingCustomerAddresses]}
            >
                <Checkbox
                    field={PAYMENT_FORM_FIELDS.billingSaveAddress}
                    label="Save this billing address"
                    disabled={disabled}
                />
            </Relevant>
        </div>
    );
};

BillingAddressForm.propTypes = {
    disabled: bool
};

export default BillingAddressForm;
