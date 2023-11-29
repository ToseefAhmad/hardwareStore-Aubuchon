import { useFieldState } from 'informed';
import { useCallback, useRef } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import { isPhone } from '@app/overrides/venia-ui/util/formValidators';

const FIELD_NAME = 'phoneNumber';

export const useMailing = () => {
    const [, { dispatch }] = useEventingContext();
    const fieldState = useFieldState(FIELD_NAME);
    const isEventSent = useRef(false);

    const handleEvent = useCallback(() => {
        if (!isEventSent.current && !isPhone(fieldState.value, true)) {
            isEventSent.current = true;
            dispatch({
                type: 'CHECKOUT_SUBSCRIBE_TO_TEXT_UPDATE'
            });
        }
    }, [dispatch, fieldState.value]);

    return {
        handleEvent
    };
};
