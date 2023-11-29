import { Form } from 'informed';
import React from 'react';

import Section from '../../partials/Section';
import Sidebar from '../../partials/Sidebar';

import BillingAddress from './partials/BillingAddress';
import OrderItems from './partials/OrderItems';
import PaymentMethods from './partials/PaymentMethods';
import Rewards from './partials/Rewards';
import classes from './payment.module.css';
import { usePayment } from './usePayment';

const PaymentStep = () => {
    const {
        getFormApi,
        initialValues,
        handleSubmit,
        isLoading,
        isSuccess,
        successButtonRef,
        paymentMethodsBlockRef,
        error,
        rewardItems,
        appliedRewards,
        recaptchaWidgetProps
    } = usePayment();

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            getApi={getFormApi}
            preventEnter
            onSubmit={handleSubmit}
        >
            <section className={classes.content}>
                {rewardItems?.length > 0 && (
                    <Section title="Would you like to apply rewards to this order?">
                        <Rewards
                            rewardItems={rewardItems}
                            appliedRewards={appliedRewards}
                        />
                    </Section>
                )}
                <Section
                    ref={paymentMethodsBlockRef}
                    title="How would you like to pay?"
                >
                    <PaymentMethods />
                </Section>
                <Section title="Billing Address">
                    <BillingAddress disabled={isLoading} />
                </Section>
                <Section>
                    <OrderItems />
                </Section>
            </section>
            <Sidebar
                submitButtonText="Place Order"
                isLoading={isLoading}
                isSuccess={isSuccess}
                successButtonRef={successButtonRef}
                error={error}
                recaptchaWidgetProps={recaptchaWidgetProps}
            />
        </Form>
    );
};

export default PaymentStep;
