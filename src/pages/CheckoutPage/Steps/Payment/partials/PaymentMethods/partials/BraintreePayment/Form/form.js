import classnames from 'classnames';
import React from 'react';

import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { STORE_CARD } from '../../../../../constants';

import Checkbox from '@app/components/Checkbox';
import Icon from '@app/components/Icon';
import { InfoFilled } from '@app/components/Icons';

import classes from './form.module.css';
import { useForm } from './useForm';

const Form = () => {
    const {
        fieldsIds,
        recaptchaWidgetProps,
        isReady,
        focused,
        error,
        getFormattedErrorMessage,
        isSignedIn
    } = useForm();

    return (
        <>
            <fieldset className={classes.root}>
                <p className={classes.label}>Credit Card</p>
                <fieldset
                    className={classnames(classes.fieldset, {
                        [classes.fieldsetFocused]: focused
                    })}
                >
                    {!isReady && (
                        <div className={classes.fieldsetShimmerWrapper}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                    )}
                    <div
                        id={fieldsIds.CARD_NUMBER_ID}
                        className={classes.hostedField}
                    />
                    <div
                        id={fieldsIds.EXPIRATION_DATE_ID}
                        className={classes.hostedField}
                    />
                    <div
                        id={fieldsIds.CVV_ID}
                        className={classes.hostedField}
                    />
                </fieldset>
                {isSignedIn && (
                    <div className={classes.checkboxContainer}>
                        <Checkbox
                            field={STORE_CARD}
                            label="Save this payment method"
                            initialValue={true}
                            classes={{
                                label: classes.checkboxLabel
                            }}
                        />
                    </div>
                )}
                {error && (
                    <p className={classes.error}>
                        <Icon src={InfoFilled} />
                        <span>{getFormattedErrorMessage(error)}</span>
                    </p>
                )}
            </fieldset>
            <GoogleRecaptcha {...recaptchaWidgetProps} />
        </>
    );
};

export default Form;
