import { useCallback, useEffect, useRef } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { usePickupStoreContext } from '@app/context/PickupStore';
import { useUserContext } from '@app/context/user';
import { useIndividualPageBranding } from '@app/hooks/useIndividualPageBranding';
import { useRouteStylesheet } from '@app/talons/RouteStylesheets';

export const useMain = () => {
    const [{ areSearchSuggestionsShown }] = useAppContext();
    const [, { dispatch }] = useEventingContext();
    const [{ currentUser, isSignedIn }] = useUserContext();
    const [{ zipcode }] = usePickupStoreContext();
    const timer = useRef(null);

    useIndividualPageBranding();
    useRouteStylesheet();

    const dispatchPageLoad = useCallback(
        (storeZipCode, userId, customer) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            // Delay page load event until all the data is ready
            timer.current = setTimeout(() => {
                // Due to timeout, we might run into component being unmounted already before timeout runs out
                if (dispatch && typeof dispatch === 'function') {
                    dispatch({
                        type: 'PAGE_LOAD',
                        payload: {
                            userId,
                            storeZipCode,
                            customer
                        }
                    });
                }
            }, 2000);
        },
        [dispatch]
    );

    useEffect(() => {
        if (zipcode) {
            dispatchPageLoad(
                zipcode,
                isSignedIn ? currentUser.uid : null,
                currentUser
            );
        }
    }, [currentUser, dispatchPageLoad, isSignedIn, zipcode]);

    return { areSearchSuggestionsShown };
};
