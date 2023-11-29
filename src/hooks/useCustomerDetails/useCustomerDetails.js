import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { useLoyaltyCustomerIdCookie } from '@app/hooks/useLoyaltyCustomerIdCookie';

import { GET_CUSTOMER_DATA } from './customerDetails.gql';

export const useCustomerDetails = () => {
    const location = useLocation();
    const [{ currentUser }, userApi] = useUserContext();
    const { updateCookieValue } = useLoyaltyCustomerIdCookie();

    const fetchUserDetails = useAwaitQuery(GET_CUSTOMER_DATA);

    useEffect(() => {
        userApi.getUserDetails({ fetchUserDetails, forceNetwork: true });
    }, [fetchUserDetails, userApi]);

    useEffect(() => {
        const cid = new URLSearchParams(location.search).get('cid');
        updateCookieValue(cid);
    }, [location, updateCookieValue]);

    useEffect(() => {
        updateCookieValue(currentUser.loyalty_api_id);
    }, [currentUser.loyalty_api_id, updateCookieValue]);
};

export default useCustomerDetails;
