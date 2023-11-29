import { useFormState } from 'informed';
import { bool } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';

import Checkbox from '@app/components/Checkbox';
import Field from '@app/components/Field';
import Link from '@app/components/Link';
import TextInput from '@app/components/TextInput';
import { APP_ROUTER_PATHS } from '@app/constants';
import { useTailwindContext } from '@app/context/tailwind';
import { isPhone } from '@app/overrides/venia-ui/util/formValidators';
import { phoneFormatter, phoneParser } from '@app/utils/formUtils';

import classes from './mailing.module.css';
import { useMailing } from './useMailing';

const Mailing = ({ isSignedIn }) => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const { formatMessage } = useIntl();
    const formState = useFormState();

    const { handleEvent } = useMailing();

    const formValues = formState.values;
    const storePickupMethod = 'storepickup|storepickup';
    const curbsideMethod = 'storepickup|curbside';

    return (
        <div className={classes.root}>
            {isMobile && (
                <div className={classes.policy}>
                    <span className={classes.text}>
                        Messages and data rates may apply.
                    </span>
                    <p className={classes.links}>
                        <Link
                            to={APP_ROUTER_PATHS.termsAndConditions}
                            target="_blank"
                        >
                            Terms of Use
                        </Link>
                        <span className={classes.separator} />
                        <Link to="/privacy-policy" target="_blank">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            )}
            <fieldset>
                {formValues.shippingMethod === storePickupMethod ? (
                    <div className={classes.shouldTextCheckbox}>
                        <Checkbox
                            field="shouldText"
                            label={formatMessage({
                                id: 'pickupStep.shouldText',
                                defaultMessage:
                                    'Yes, please text me when my order is ready (recommended)'
                            })}
                            initialValue={true}
                        />
                    </div>
                ) : (
                    <span className={classes.curbsideRequired}>
                        Mobile number is required for Curbside
                    </span>
                )}
                {(formValues.shouldText ||
                    formValues.shippingMethod === curbsideMethod) && (
                    <Field
                        label={formatMessage({
                            id: 'pickupStep.enterMobilePhoneNumber',
                            defaultMessage: 'Enter Mobile Phone Number'
                        })}
                        classes={{
                            root: classes.fieldRoot
                        }}
                    >
                        <TextInput
                            autoComplete="off"
                            field="phoneNumber"
                            placeholder={formatMessage({
                                id: 'pickupStep.enterPhoneNumber',
                                defaultMessage: 'Enter phone number'
                            })}
                            validate={value =>
                                isPhone(
                                    value,
                                    formValues?.shippingMethod ===
                                        curbsideMethod
                                )
                            }
                            validateOnChange
                            formatter={phoneFormatter}
                            parser={phoneParser}
                            onBlur={() => {
                                handleEvent();
                            }}
                        />
                    </Field>
                )}
                {!isMobile && (
                    <div className={classes.policy}>
                        <span className={classes.text}>
                            Messages and data rates may apply.
                        </span>
                        <p className={classes.links}>
                            <Link
                                to={APP_ROUTER_PATHS.termsAndConditions}
                                target="_blank"
                            >
                                Terms of Use
                            </Link>
                            <span className={classes.separator} />
                            <Link to="/privacy-policy" target="_blank">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                )}
                {isSignedIn &&
                    (formValues.shouldText ||
                        formValues.shippingMethod === curbsideMethod) && (
                        <Checkbox
                            field="shouldSave"
                            label={formatMessage({
                                id: 'pickupStep.shouldSave',
                                defaultMessage:
                                    'Save this number to make future orders faster'
                            })}
                        />
                    )}
            </fieldset>
        </div>
    );
};

Mailing.propTypes = {
    isSignedIn: bool
};

export default Mailing;
