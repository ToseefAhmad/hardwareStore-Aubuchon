import React, { Suspense, lazy } from 'react';

import { CHECKOUT_STEPS_KEYS } from '../constants';
import { useCheckoutPageContext } from '../context';
import Tabs from '../partials/Tabs';
import InfoStepShimmer from '../Steps/Info/info.shimmer';
import PaymentStepShimmer from '../Steps/Payment/payment.shimmer';
import PickupStepShimmer from '../Steps/Pickup/pickup.shimmer';
import classes from './content.module.css';

const STEPS_COMPONENTS = {
    [CHECKOUT_STEPS_KEYS.info]: {
        component: lazy(() => import('../Steps/Info')),
        shimmer: InfoStepShimmer
    },
    [CHECKOUT_STEPS_KEYS.pickup]: {
        component: lazy(() => import('../Steps/Pickup')),
        shimmer: PickupStepShimmer
    },
    [CHECKOUT_STEPS_KEYS.payment]: {
        component: lazy(() => import('../Steps/Payment')),
        shimmer: PaymentStepShimmer
    }
};

const CheckoutPageContent = () => {
    const [{ activeTabKey, isDataReady }] = useCheckoutPageContext();

    const CurrentStepComponent = STEPS_COMPONENTS[activeTabKey].component;
    const CurrentStepComponentShimmer = STEPS_COMPONENTS[activeTabKey].shimmer;

    return (
        <section className={classes.root}>
            <h1 className={classes.title}>Checkout</h1>
            <Tabs />
            {!isDataReady ? (
                <CurrentStepComponentShimmer />
            ) : (
                <Suspense fallback={<CurrentStepComponentShimmer />}>
                    <CurrentStepComponent />
                </Suspense>
            )}
        </section>
    );
};

export default CheckoutPageContent;
