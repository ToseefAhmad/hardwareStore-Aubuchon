import { APP_ROUTER_PATHS } from '@app-constants';
import { Form } from 'informed';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '@app/components/Button';
import Checkbox from '@app/components/Checkbox';
import Field from '@app/components/Field';
import Link from '@app/components/Link';
import Region from '@app/components/Region2';
import Section from '@app/components/Section';
import TextInput from '@app/components/TextInput';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './editForm.module.css';

const AddressEditForm = props => {
    const {
        data: { countries, addressData },
        isLoading,
        handleSubmit
    } = props;
    const { formatMessage } = useIntl();

    return (
        <Form
            className={classes.root}
            initialValues={addressData}
            onSubmit={handleSubmit}
        >
            <fieldset className={classes.fieldset}>
                <Field
                    id="firstname"
                    label={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                    required
                >
                    <TextInput
                        field="firstname"
                        validate={isRequired}
                        placeholder={formatMessage({
                            id: 'global.enterFirstName',
                            defaultMessage: 'Enter First Name'
                        })}
                        disabled={isLoading}
                    />
                </Field>
                <Field
                    id="lastname"
                    label={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                    required
                >
                    <TextInput
                        field="lastname"
                        validate={isRequired}
                        placeholder={formatMessage({
                            id: 'global.enterLastName',
                            defaultMessage: 'Enter Last Name'
                        })}
                        disabled={isLoading}
                    />
                </Field>
                <Field
                    id="company"
                    label={formatMessage({
                        id: 'global.companyName',
                        defaultMessage: 'Company'
                    })}
                >
                    <TextInput
                        field="company"
                        placeholder={formatMessage({
                            id: 'global.enterCompanyName',
                            defaultMessage: 'Enter Company Name'
                        })}
                        disabled={isLoading}
                    />
                </Field>
                <Field
                    id="telephone"
                    label={formatMessage({
                        id: 'global.phoneNumber',
                        defaultMessage: 'Phone Number'
                    })}
                    required
                >
                    <TextInput
                        field="telephone"
                        validate={isRequired}
                        formatter={phoneFormatter}
                        parser={phoneParser}
                        placeholder={formatMessage({
                            id: 'global.enterPhoneNumber',
                            defaultMessage: 'Enter Phone Number'
                        })}
                        disabled={isLoading}
                    />
                </Field>
            </fieldset>
            <Section>
                <Section.Title>
                    <FormattedMessage
                        id="global.address"
                        defaultMessage="Address"
                    />
                </Section.Title>
                <fieldset className={classes.fieldset}>
                    <Field
                        id="street[0]"
                        label={formatMessage({
                            id: 'global.streetAddress',
                            defaultMessage: 'Street Address'
                        })}
                        required
                    >
                        <TextInput
                            field="street[0]"
                            validate={isRequired}
                            placeholder={formatMessage({
                                id: 'global.enterStreetAddress',
                                defaultMessage: 'Enter Your Street Address'
                            })}
                            disabled={isLoading}
                        />
                    </Field>
                    <Field
                        id="city"
                        label={formatMessage({
                            id: 'global.city',
                            defaultMessage: 'City'
                        })}
                        required
                    >
                        <TextInput
                            field="city"
                            validate={isRequired}
                            placeholder={formatMessage({
                                id: 'global.enterCity',
                                defaultMessage: 'Enter City'
                            })}
                            disabled={isLoading}
                        />
                    </Field>
                    <Field
                        id="region_id"
                        label={formatMessage({
                            id: 'global.region',
                            defaultMessage: 'State / Province / Region'
                        })}
                        required
                    >
                        <TextInput
                            classes={{ root: classes.hiddenInput }}
                            field="country_code"
                            validate={isRequired}
                            disabled
                        />
                        <Region
                            field="region.region_id"
                            countyField="country_code"
                            validate={isRequired}
                            countries={countries}
                            disabled={isLoading}
                        />
                    </Field>
                    <Field
                        id="postcode"
                        label={formatMessage({
                            id: 'global.postcode',
                            defaultMessage: 'ZIP/Postal Code'
                        })}
                        required
                    >
                        <TextInput
                            field="postcode"
                            validate={isRequired}
                            placeholder={formatMessage({
                                id: 'global.enterPostcode',
                                defaultMessage: 'Enter ZIP/Postal Code'
                            })}
                            disabled={isLoading}
                        />
                    </Field>
                </fieldset>
                <fieldset className={classes.checkboxes}>
                    <Checkbox
                        field="default_billing"
                        label={formatMessage({
                            id: 'global.useAsDefaultBillingAddress',
                            defaultMessage: 'Use as my default billing address'
                        })}
                        disabled={isLoading}
                    />
                    <Checkbox
                        field="default_shipping"
                        label={formatMessage({
                            id: 'global.useAsDefaultShippingAddress',
                            defaultMessage: 'Use as my default shipping address'
                        })}
                        disabled={isLoading}
                    />
                </fieldset>
            </Section>
            <fieldset className={classes.buttons}>
                <div className={classes.buttonWrap}>
                    <Button type="submit" priority="high" isLoading={isLoading}>
                        <FormattedMessage
                            id="global.saveAddress"
                            defaultMessage="Save Address"
                        />
                    </Button>
                </div>
                <Link
                    className={classes.cancelBtn}
                    to={APP_ROUTER_PATHS.addressBook}
                    isButtonLike
                    priority="secondary"
                    disabled={isLoading}
                >
                    <FormattedMessage
                        id="global.cancel"
                        defaultMessage="Cancel"
                    />
                </Link>
            </fieldset>
        </Form>
    );
};

AddressEditForm.propTypes = {
    data: shape({
        countries: arrayOf(
            shape({
                id: string,
                full_name_locale: string,
                available_regions: arrayOf(
                    shape({
                        id: number,
                        name: string
                    })
                )
            })
        ).isRequired,
        addressData: shape({
            id: number,
            firstname: string,
            lastname: string,
            company: string,
            street: arrayOf(string),
            city: string,
            region_id: number,
            postcode: string,
            country_code: string,
            telephone: string
        })
    }).isRequired,
    isLoading: bool,
    handleSubmit: func.isRequired
};

export default AddressEditForm;
