import { Form } from 'informed';
import { func } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Trash as DeleteIcon } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import TextInput from '@app/components/TextInput';

import defaultClasses from './couponCode.module.css';
import { useCouponCode } from './useCouponCode';

const CouponCode = props => {
    const { setIsCartUpdating } = props;
    const classes = useStyle(defaultClasses);

    const {
        applyingCoupon,
        data,
        errors,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    } = useCouponCode({
        setIsCartUpdating
    });

    if (!data) {
        return null;
    }

    if (data?.cart?.applied_coupons) {
        const codes = data.cart.applied_coupons.map(({ code }) => {
            return (
                <Fragment key={code}>
                    <span>{code}</span>
                    <LinkButton
                        className={classes.removeButton}
                        disabled={removingCoupon}
                        onClick={() => {
                            handleRemoveCoupon(code);
                        }}
                    >
                        <Icon src={DeleteIcon} />
                    </LinkButton>
                </Fragment>
            );
        });

        return <div className={classes.appliedCoupon}>{codes}</div>;
    }

    return (
        <Fragment>
            <FormError
                allowErrorMessages
                errors={Array.from(errors.values())}
                classes={{
                    root: classes.errorLabel
                }}
            />
            <Form className={classes.entryForm} onSubmit={handleApplyCoupon}>
                <Field
                    classes={{
                        label: classes.label,
                        root: classes.inputWrapper
                    }}
                    id="couponCode"
                    label="Promo Code"
                >
                    <TextInput
                        classes={{ input: classes.input }}
                        field="couponCode"
                        id="couponCode"
                        placeholder="Enter promo code"
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                    />
                </Field>
                <div className={classes.buttonContainer}>
                    <Button
                        classes={{
                            primary: classes.button,
                            disabled: classes.buttonDisabled
                        }}
                        isLoading={applyingCoupon}
                        priority="high"
                        type="submit"
                    >
                        Apply Code
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

CouponCode.propTypes = {
    setIsCartUpdating: func
};

CouponCode.defaultProps = {
    setIsCartUpdating: () => {}
};

export default CouponCode;
