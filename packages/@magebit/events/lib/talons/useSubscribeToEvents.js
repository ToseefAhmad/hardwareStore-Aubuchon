import { useCallback, useEffect } from "react";

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import log from '../util/log';

import collection from './eventCollection';

export const useSubscribeToEvents = () => {
    const [observable] = useEventingContext();

    /**
     * @type {EventCallback|*}
     */
    const callback = useCallback(event => {
        log(event, collection.get(event.type));

        if (collection.has(event.type)) {
            collection.get(event.type).forEach(async cb => {
                try {
                    cb(event.payload)
                } catch (e) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.error('Event callback failed: ', e);
                    }
                }
            });
        }
    }, []);

    useEffect(() => {
        const subscription = observable.subscribe(callback);

        return () => {
            subscription.unsubscribe()
        }
    }, [callback, observable]);
};

/**
 * @callback EventCallback
 * @param {{type: string, payload: {any}}} event
 * @return {void}
 */
