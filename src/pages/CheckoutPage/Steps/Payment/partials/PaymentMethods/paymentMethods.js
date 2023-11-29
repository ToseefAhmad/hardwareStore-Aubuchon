import classnames from 'classnames';
import { Relevant } from 'informed';
import { bool } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import RadioGroup from '@app/components/RadioGroup';
import Radio from '@app/components/RadioGroup/radio';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './paymentMethods.module.css';
import SelectedPaymentMethod from './SelectedPaymentMethod';
import { usePaymentMethods } from './usePaymentMethods';

const PaymentMethods = props => {
    const { disabled } = props;

    const {
        fieldName,
        fieldValue,
        paymentMethods,
        showSelectedPaymentMethod,
        handleShowPaymentMethodForm
    } = usePaymentMethods();

    return (
        <>
            {!showSelectedPaymentMethod ? (
                <RadioGroup field={fieldName} validate={isRequired}>
                    {paymentMethods.map(
                        ({
                            label,
                            value,
                            id = null,
                            Logo = null,
                            Component = null
                        }) => (
                            <div
                                key={value}
                                className={classes.radioInputWrapper}
                            >
                                <Radio
                                    id={value}
                                    value={value}
                                    classes={{
                                        root: classnames(
                                            classes.radioContainer,
                                            {
                                                [classes.radioContainerNormal]:
                                                    value !== fieldValue &&
                                                    !disabled,
                                                [classes.radioContainerActive]:
                                                    value === fieldValue &&
                                                    !disabled,
                                                [classes.radioContainerDisabled]: disabled
                                            }
                                        ),
                                        input: classes.radioInput
                                    }}
                                >
                                    <span>{label}</span>
                                    {Logo && (
                                        <div className={classes.logoWrapper}>
                                            <Logo />
                                        </div>
                                    )}
                                </Radio>
                                {Component && (
                                    <Relevant
                                        when={({ values }) =>
                                            value === id &&
                                            values[fieldName] === id
                                        }
                                        relevanceWhen={[fieldName]}
                                    >
                                        <Component />
                                    </Relevant>
                                )}
                            </div>
                        )
                    )}
                </RadioGroup>
            ) : (
                <>
                    <SelectedPaymentMethod />
                    <Button
                        onPress={handleShowPaymentMethodForm}
                        classes={{
                            tall: classes.tall
                        }}
                    >
                        Change Payment Method
                    </Button>
                </>
            )}
        </>
    );
};

PaymentMethods.propTypes = {
    disabled: bool
};

export default PaymentMethods;
