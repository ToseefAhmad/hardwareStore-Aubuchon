import { useFieldState } from 'informed';
import { useCallback, useRef } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const usePickupPerson = ({ fieldName }) => {
    const [, { dispatch }] = useEventingContext();
    const fieldState = useFieldState(fieldName);
    const isEventSent = useRef(false);

    const handleEvent = useCallback(() => {
        if (!isEventSent.current && fieldState.value === '1') {
            isEventSent.current = true;
            dispatch({
                type: 'CHECKOUT_SELECT_PICKUP_PERSON'
            });
        }
    }, [dispatch, fieldState.value]);

    return {
        handleEvent
    };
};
