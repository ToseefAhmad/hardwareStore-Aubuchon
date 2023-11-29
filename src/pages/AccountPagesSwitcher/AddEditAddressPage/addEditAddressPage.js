import React from 'react';
import { FormattedMessage } from 'react-intl';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import AddEditAddressPageShimmer from './addEditAddressPage.shimmer';
import AddressEditForm from './EditForm';
import { useAddEditAddressPage } from './useAddEditAddressPage';

const AddEditAddressPage = () => {
    const {
        pageData,
        loadDataError,
        isLoading,
        handleSubmit
    } = useAddEditAddressPage();

    let pageContent = <AddEditAddressPageShimmer />;

    if (loadDataError) {
        pageContent = (
            <p>
                <FormattedMessage
                    id="addEditAddressPage.errorTryAgain"
                    defaultMessage="Something went wrong. Please refresh and try again."
                />
            </p>
        );
    } else if (!isObjectEmpty(pageData)) {
        pageContent = (
            <AddressEditForm
                data={pageData}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
            />
        );
    }

    return pageContent;
};

export default AddEditAddressPage;
