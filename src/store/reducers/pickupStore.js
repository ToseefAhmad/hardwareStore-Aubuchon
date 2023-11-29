import { handleActions } from 'redux-actions';

import actions from '../actions/pickupStore';

export const name = 'pickupStore';

export const initialState = {
    id: null,
    url_key: null,
    latitude: null,
    longitude: null,
    address: null,
    city: null,
    region_code: null,
    region_name: null,
    zipcode: null,
    phone: null,
    email: null,
    images: [],
    brand: null,
    schedule: [],
    holidays: [],
    specialDays: [],
    isLoading: false,
    getPickupStoreError: null,
    userLocation: {
        latitude: null,
        longitude: null
    }
};

const reducerMap = {
    [actions.getPickupStoreDetails.request]: state => {
        return {
            ...state,
            isLoading: true
        };
    },
    [actions.getPickupStoreDetails.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...initialState,
                getPickupStoreError: payload
            };
        }
        return {
            ...state,
            ...payload,
            isLoading: false,
            getPickupStoreError: null
        };
    },
    [actions.updateUserLocation]: (state, { payload }) => {
        return {
            ...state,
            userLocation: payload
                ? { ...payload }
                : { latitude: 0, longitude: 0 }
        };
    },
    [actions.reset]: () => initialState
};

export default handleActions(reducerMap, initialState);
