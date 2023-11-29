import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { normalizeCustomerAddress } from '@app/components/AddressCard/utils';
import { useUserContext } from '@app/context/user';

import AddressBookPageOperations from './addressBookPage.gql';

export const useAddressBookPage = () => {
    const {
        queries: { getCustomerAddressesQuery },
        mutations: { deleteCustomerAddressMutation }
    } = AddressBookPageOperations;

    const [{ isSignedIn, currentUser }] = useUserContext();

    const [, { dispatch }] = useEventingContext();

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    const { data: customerAddressesData, error: loadDataError } = useQuery(
        getCustomerAddressesQuery,
        {
            skip: !isSignedIn,
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const [
        deleteCustomerAddress,
        {
            error: deleteCustomerAddressError,
            loading: isDeletingCustomerAddress
        }
    ] = useMutation(deleteCustomerAddressMutation);

    const errors = displayError ? [deleteCustomerAddressError] : [];

    const pageData = useMemo(() => {
        const value = {};

        if (customerAddressesData) {
            const { customer } = customerAddressesData;
            const { default_billing, default_shipping, addresses } = customer;

            const defaultBilling = default_billing
                ? normalizeCustomerAddress(
                      addresses.find(({ id }) => id === +default_billing)
                  )
                : null;
            const defaultShipping = default_shipping
                ? normalizeCustomerAddress(
                      addresses.find(({ id }) => id === +default_shipping)
                  )
                : null;

            const list =
                defaultBilling || defaultShipping
                    ? addresses.filter(
                          ({ id }) =>
                              id !== +default_billing &&
                              id !== +default_shipping
                      )
                    : addresses;

            value.addresses = {
                defaultBilling,
                defaultShipping,
                list: list.map(address => normalizeCustomerAddress(address))
            };
        }

        return value;
    }, [customerAddressesData]);

    const handleDeleteAddress = useCallback(
        async ({ id }) => {
            try {
                await deleteCustomerAddress({
                    variables: { addressId: id },
                    refetchQueries: [{ query: getCustomerAddressesQuery }],
                    awaitRefetchQueries: true
                });

                dispatch({
                    type: 'USER_ADDRESS_DELETE',
                    payload: {
                        addressId: id,
                        user: currentUser
                    }
                });

                setDisplayError(false);
            } catch {
                setDisplayError(true);

                return;
            }
        },
        [
            currentUser,
            deleteCustomerAddress,
            dispatch,
            getCustomerAddressesQuery
        ]
    );

    return {
        pageData,
        loadDataError,
        errors,
        handleDeleteAddress,
        isDeletingCustomerAddress
    };
};
