import { APP_ROUTER_PATHS } from '@app-constants';
import { Form } from 'informed';
import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import GoogleRecaptcha from '@app/components/GoogleReCaptcha';
import Link from '@app/components/Link';
import TextInput from '@app/components/TextInput';

import defaultClasses from './newsletter.module.css';
import Shimmer from './newsletter.shimmer';
import { useNewsletter } from './useNewsletter';

const Newsletter = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useNewsletter();

    const [subscribed, setSubscribed] = useState(false);

    const {
        isEnabled,
        handleSubmit,
        isBusy,
        isLoading,
        setFormApi,
        newsLetterResponse,
        clearErrors,
        recaptchaWidgetProps
    } = talonProps;

    useEffect(() => {
        if (newsLetterResponse && newsLetterResponse.status) {
            setSubscribed(true);
        }
    }, [newsLetterResponse, setSubscribed]);

    if (isLoading) {
        return <Shimmer />;
    }

    if (!isEnabled) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.greetingWrapper}>
                <img
                    className={classes.icon}
                    src={'/assets/icons/waving.png'}
                    alt=""
                />
                <div className={classes.greetingTextWrapper}>
                    <h4>Since you are here, get offers!</h4>
                    <p>Like 15% off your first order!</p>
                </div>
            </div>
            <Form
                getApi={setFormApi}
                className={classes.form}
                onSubmit={handleSubmit}
            >
                <Field
                    classes={{
                        label: classes.label,
                        root: classes.inputWrapper
                    }}
                    id="email"
                    label={'Email'}
                >
                    <TextInput
                        autoComplete="email"
                        field="email"
                        type="email"
                        id="email"
                        aria-label="email"
                        placeholder="Enter e-mail"
                    />
                </Field>
                <div className={classes.buttonContainer}>
                    <Button
                        priority={subscribed ? 'high' : 'normal'}
                        type="submit"
                        isLoading={isBusy}
                        onClick={clearErrors}
                    >
                        {subscribed ? 'Success!' : 'Subscribe'}
                    </Button>
                </div>
            </Form>
            <GoogleRecaptcha
                {...recaptchaWidgetProps}
                classes={{
                    root: classes.recaptcha,
                    text: classes.recaptchaText
                }}
            />
            <div className={classes.legal}>
                <span>By providing your email, you agree to our&nbsp;</span>
                <div className={classes.legalLinks}>
                    <Link priority="secondary" to={'/privacy-policy'}>
                        Privacy policy
                    </Link>
                    <span>{' & '}</span>
                    <Link
                        priority="secondary"
                        to={APP_ROUTER_PATHS.termsAndConditions}
                    >
                        Terms
                    </Link>
                </div>
            </div>
        </div>
    );
};

Newsletter.propTypes = {
    classes: shape({
        root: string,
        title: string,
        form: string,
        buttonContainer: string
    })
};

export default Newsletter;
