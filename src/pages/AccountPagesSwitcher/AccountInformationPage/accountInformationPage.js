import React from 'react';
import { FormattedMessage } from 'react-intl';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import classes from './accountInformationPage.module.css';
import AccountInformationPageShimmer from './accountInformationPage.shimmer';
import EditForm from './EditForm';
import { useAccountInformationPage } from './useAccountInformationPage';

const AccountInformationPage = () => {
    const {
        initialValues,
        getDetailsError,
        recaptchaWidgetProps,
        handleSubmit,
        isLoading,
        isDisabled,
        getFormApi
    } = useAccountInformationPage();

    let pageContent = <AccountInformationPageShimmer />;

    if (getDetailsError) {
        pageContent = (
            <div className={classes.errorContainer}>
                <p>
                    <FormattedMessage
                        id="accountInformationPage.errorTryAgain"
                        defaultMessage="Something went wrong. Please refresh and try again."
                    />
                </p>
            </div>
        );
    } else if (!isObjectEmpty(initialValues)) {
        pageContent = (
            <EditForm
                initialValues={initialValues.customer}
                recaptchaWidgetProps={recaptchaWidgetProps}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isDisabled={isDisabled}
                getFormApi={getFormApi}
            />
        );
    }

    return pageContent;
};

export default AccountInformationPage;
