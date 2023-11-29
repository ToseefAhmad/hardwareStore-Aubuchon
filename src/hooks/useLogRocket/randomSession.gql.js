import { gql } from '@apollo/client';

const GET_LOG_ROCKET_TRACKING = gql`
    query getLogRocketTracking {
        logRocketTracking {
            can_track
        }
    }
`;

const TRACK_LOG_ROCKET_RECORDING = gql`
    mutation trackLogRocketRecording {
        trackLogRocketRecording
    }
`;

export default {
    queries: {
        getLogRocketTrackingQuery: GET_LOG_ROCKET_TRACKING
    },
    mutations: {
        trackLogRocketRecordingMutation: TRACK_LOG_ROCKET_RECORDING
    }
};
