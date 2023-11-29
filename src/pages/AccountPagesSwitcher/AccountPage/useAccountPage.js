import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

import { normalizeCustomerAddress } from '@app/components/AddressCard/utils';
import { useUserContext } from '@app/context/user';

import AccountPageOperations from './accountPage.gql';

export const useAccountPage = () => {
    const {
        queries: { getAccountPageInfoQuery }
    } = AccountPageOperations;

    const [{ isSignedIn }] = useUserContext();

    const { data: accountPageInfoData, error: loadDataError } = useQuery(
        getAccountPageInfoQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            skip: !isSignedIn
        }
    );

    const pageData = useMemo(() => {
        const value = {};

        if (accountPageInfoData) {
            const {
                customer,
                rewardInformation,
                rewards
            } = accountPageInfoData;
            const {
                firstname,
                lastname,
                email,
                default_billing,
                default_shipping,
                addresses
            } = customer;

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

            value.customer = {
                firstname,
                lastname,
                email,
                addresses: {
                    defaultBilling,
                    defaultShipping
                }
            };

            value.rewardInformation = {
                points: rewards.point_total || 0,
                money: rewardInformation.money || 0
            };
        }

        return value;
    }, [accountPageInfoData]);

    return {
        pageData,
        loadDataError
    };
};
