import { useMutation, useQuery } from '@apollo/client';
import { APP_ROUTER_PATHS } from '@app-constants';
import { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import { messages as toastMessages } from '@app/components/ToastContainer';
import { useUserContext } from '@app/context/user';

import AddEditAddressPageOperations from './addEditAddressPage.gql';

export const useAddEditAddressPage = () => {
    const {
        queries: { getAddEditAddressPageDataQuery },
        mutations: {
            addNewCustomerAddressMutation,
            updateCustomerAddressMutation
        }
    } = AddEditAddressPageOperations;

    const { id: addressId } = useParams();
    const history = useHistory();

    const [isEditMode, setIsEditMode] = useState(!!addressId);

    const [{ isSignedIn, currentUser }] = useUserContext();
    const [, { addToast }] = useToasts();

    const { data: addEditAddressPageData, error: loadDataError } = useQuery(
        getAddEditAddressPageDataQuery,
        {
            variables: { withAddresses: isEditMode },
            skip: !isSignedIn,
            fetchPolicy: 'no-cache'
        }
    );

    const [
        addNewCustomerAddress,
        {
            error: addNewCustomerAddressError,
            loading: isAddingNewCustomerAddress
        }
    ] = useMutation(addNewCustomerAddressMutation);

    const [
        updateCustomerAddress,
        {
            error: updateCustomerAddressError,
            loading: isUpdatingCustomerAddress
        }
    ] = useMutation(updateCustomerAddressMutation);

    const pageData = useMemo(() => {
        const value = {};

        if (addEditAddressPageData) {
            const { countries, customer } = addEditAddressPageData;

            value.countries = countries;

            if (customer) {
                value.addressData = customer.addresses.find(
                    ({ id }) => id === +addressId
                );
            }
            if (!isEditMode) {
                // Initial values for the form field
                // prefill phone number and preselect US as the country
                value.addressData = {
                    telephone: currentUser.telephone,
                    country_code: 'US'
                };
            }
        }

        return value;
    }, [addEditAddressPageData, addressId, currentUser.telephone, isEditMode]);
    const handleSubmit = async formValues => {
        const handleFunc = isEditMode
            ? updateCustomerAddress
            : addNewCustomerAddress;
        const options = isEditMode
            ? {
                  variables: {
                      addressId,
                      updated_address: {
                          ...formValues
                      }
                  }
              }
            : {
                  variables: {
                      address: {
                          ...formValues
                      }
                  }
              };

        try {
            await handleFunc(options);
            addToast({
                type: 'success',
                message: toastMessages.UPDATE_ACCOUNT_INFO
            });
            history.push(APP_ROUTER_PATHS.addressBook);
        } catch {
            // Mutation errors are handled by toast messages
        }
    };

    useEffect(() => {
        if (isEditMode && !isObjectEmpty(pageData) && !pageData.addressData) {
            history.replace(APP_ROUTER_PATHS.addAddressPage);
            setIsEditMode(false);
        }
    }, [isEditMode, pageData, history]);

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                addNewCustomerAddressError,
                updateCustomerAddressError
            ]),
        [addNewCustomerAddressError, updateCustomerAddressError]
    );

    useEffect(() => {
        if (derivedErrorMessage) {
            addToast({
                type: 'error',
                message: derivedErrorMessage
            });
        }
    }, [derivedErrorMessage, addToast]);

    return {
        isEditMode,
        pageData,
        loadDataError,
        isLoading: isAddingNewCustomerAddress || isUpdatingCustomerAddress,
        handleSubmit
    };
};
