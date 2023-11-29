import { clearCheckoutDataFromStorage } from '@magento/peregrine/lib/store/actions/checkout';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { removeCart } from '../cart';
import actions from './actions';

const storage = new BrowserPersistence();

// 3 days in seconds
const TOKEN_EXPIRATION_TIME = '259200';

export const signOut = (payload = {}) =>
    async function thunk(dispatch, getState, { apolloClient }) {
        const { revokeToken } = payload;

        if (revokeToken) {
            // Send mutation to revoke token.
            try {
                await revokeToken();
            } catch (error) {
                console.error('Error Revoking Token', error);
            }
        }

        // Remove token from local storage and Redux.
        await dispatch(clearToken());
        await dispatch(actions.reset());
        await clearCheckoutDataFromStorage();
        await apolloClient.clearCacheData(apolloClient, 'cart');
        await apolloClient.clearCacheData(apolloClient, 'customer');

        // Now that we're signed out, forget the old (customer) cart.
        // We don't need to create a new cart here because we're going to refresh
        // the page immediately after.
        await dispatch(removeCart());
    };

export const getUserDetails = ({ fetchUserDetails, forceNetwork = false }) =>
    async function thunk(...args) {
        const [dispatch, getState] = args;
        const { user } = getState();

        if (user.isSignedIn) {
            dispatch(actions.getDetails.request());

            try {
                const { data } = await fetchUserDetails(
                    forceNetwork ? { fetchPolicy: 'network-only' } : null
                );

                dispatch(actions.getDetails.receive(data.customer));
            } catch (error) {
                dispatch(actions.getDetails.receive(error));
            }
        }
    };

export const resetPassword = ({ email }) =>
    async function thunk(...args) {
        const [dispatch] = args;

        dispatch(actions.resetPassword.request());

        // @todo: actually make the call to the API.
        // For now, just return a resolved promise.
        await Promise.resolve(email);

        dispatch(actions.resetPassword.receive());
    };

export const setToken = token =>
    async function thunk(...args) {
        const [dispatch] = args;

        // Store token in local storage.
        // @todo: Get correct token expire time from API
        storage.setItem('signin_token', token, TOKEN_EXPIRATION_TIME);

        // Persist in store
        dispatch(actions.setToken(token));
    };

export const clearToken = () =>
    async function thunk(...args) {
        const [dispatch] = args;

        // Clear token from local storage
        storage.removeItem('signin_token');

        // Remove from store
        dispatch(actions.clearToken());
        dispatch(actions.setSignInStatus(false));
    };
