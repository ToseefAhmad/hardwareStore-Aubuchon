import { Form } from 'informed';
import React from 'react';

import Section from '../../partials/Section';
import Sidebar from '../../partials/Sidebar';

import CurrentStoreInfo from '@app/components/CurrentStoreInfo';

import Mailing from './Mailing';
import classes from './pickup.module.css';
import PickupPerson from './PickupPerson';
import ShippingMethodBlock from './ShippingMethodBlock';
import { usePickup } from './usePickup';

const PickupStep = () => {
    const {
        getFormApi,
        initialValues,
        isLoading,
        handleSubmit,
        isSignedIn
    } = usePickup();

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            getApi={getFormApi}
            preventEnter
            onSubmit={handleSubmit}
        >
            <section className={classes.content}>
                <Section title="Current pickup store">
                    <CurrentStoreInfo
                        classes={{
                            root: classes.storeInfoRoot,
                            imageRoot: classes.imageRoot,
                            image: classes.image,
                            logo: classes.logo,
                            info: classes.info,
                            address: classes.address,
                            storeName: classes.storeName,
                            close: classes.close,
                            workHours: classes.workHours,
                            text: classes.workHours,
                            open: classes.open
                        }}
                    />
                </Section>
                <Section title="Pickup Method">
                    <ShippingMethodBlock disabled={isLoading} />
                </Section>
                <Section propsClasses={classes.mailingSection}>
                    <Mailing isSignedIn={isSignedIn} />
                </Section>
                <Section title="Who will be picking up this order?">
                    <PickupPerson disabled={isLoading} />
                </Section>
            </section>
            <Sidebar
                submitButtonText="Continue To Payment"
                isLoading={isLoading}
            />
        </Form>
    );
};

export default PickupStep;
