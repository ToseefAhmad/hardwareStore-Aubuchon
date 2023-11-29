import { useMutation } from '@apollo/client';
import LogRocket from 'logrocket';
import { useCallback, useEffect } from 'react';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import operations from './randomSession.gql';
import { useLogRocket } from './useLogRocket';

export const useRandomSession = () => {
    const {
        queries: { getLogRocketTrackingQuery },
        mutations: { trackLogRocketRecordingMutation }
    } = operations;
    const { isEnabled, shouldTrack, initSession } = useLogRocket();

    // Use `no-cache` to avoid incorrect sessions limit tracking.
    const fetchLogRocketTracking = useAwaitQuery(getLogRocketTrackingQuery);
    const [trackLogRocketRecording] = useMutation(
        trackLogRocketRecordingMutation,
        { fetchPolicy: 'no-cache' }
    );

    /**
     * Validate if limit has not reached.
     * If it is not, try to initiate the session.
     * If session is initiated, add to the tracked amount
     *
     * @type {(function(): Promise<void>)|*}
     */
    const initRandomSession = useCallback(async () => {
        if (isEnabled) {
            const {
                data: logRocketTrackingData
            } = await fetchLogRocketTracking({
                fetchPolicy: 'no-cache'
            });
            if (logRocketTrackingData?.logRocketTracking?.can_track) {
                initSession();
                LogRocket.getSessionURL(() => {
                    trackLogRocketRecording();
                });
            }
        }
    }, [
        isEnabled,
        fetchLogRocketTracking,
        initSession,
        trackLogRocketRecording
    ]);

    useEffect(() => {
        if (!isEnabled) {
            return;
        }
        if (!shouldTrack()) {
            initSession();
        } else {
            initRandomSession();
        }
    }, [initRandomSession, initSession, isEnabled, shouldTrack]);
};
