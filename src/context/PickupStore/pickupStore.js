import { arrayOf, bool, func, node, number, shape, string } from 'prop-types';
import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import bindActionCreators from '@magento/peregrine/lib/util/bindActionCreators';

import actions from '@app/store/actions/pickupStore/actions';
import * as asyncActions from '@app/store/actions/pickupStore/asyncActions';

import { GET_CURRENT_PICKUP_STORE } from './pickupStore.gql';

export const GEO_IP_COOKIES_COORDINATES_KEY = 'geo-ip-coordinates';
export const GEO_IP_COOKIES_MAX_AGE = 2628000;
export const GEO_IP_COOKIES_PATH = '/';

const PickupStoreContext = createContext();

const PickupStoreContextProvider = ({
    actions,
    asyncActions,
    pickupStoreState,
    children
}) => {
    const pickupStoreApi = useMemo(() => ({ ...actions, ...asyncActions }), [
        actions,
        asyncActions
    ]);
    const contextValue = [pickupStoreState, pickupStoreApi];

    // Query that handles pickup store data fetch.
    const getCurrentPickupStore = useAwaitQuery(GET_CURRENT_PICKUP_STORE);

    // Fetch pickup store data
    useEffect(() => {
        pickupStoreApi.getPickupStoreDetails(getCurrentPickupStore);
    }, [getCurrentPickupStore, pickupStoreApi]);

    // Get user location from cookie. It is expected to be returned by Fastly
    const [cookies] = useCookies();
    const userLocation = useMemo(() => {
        const coordinatesString = cookies[GEO_IP_COOKIES_COORDINATES_KEY];
        if (coordinatesString) {
            const coordinatesArr = coordinatesString.split(',');
            return {
                latitude: Number(coordinatesArr[0]),
                longitude: Number(coordinatesArr[1])
            };
        }

        return undefined;
    }, [cookies]);

    useEffect(() => {
        // We want to update if there is no userLocation in state, or if the new value is different.
        if (
            !pickupStoreState.isLoading &&
            (pickupStoreState.userLocation.latitude === null ||
                (userLocation &&
                    JSON.stringify(userLocation) !==
                        JSON.stringify(pickupStoreState.userLocation)))
        ) {
            pickupStoreApi.updateUserLocation(userLocation);
        }
    }, [
        pickupStoreApi,
        pickupStoreState.isLoading,
        pickupStoreState.userLocation,
        userLocation
    ]);

    return (
        <PickupStoreContext.Provider value={contextValue}>
            {children}
        </PickupStoreContext.Provider>
    );
};

PickupStoreContextProvider.propTypes = {
    actions: shape({
        actions: func,
        reset: func
    }),
    asyncActions: shape({
        getPickupStoreDetails: func
    }),
    pickupStoreState: shape({
        id: number,
        url_key: string,
        latitude: number,
        longitude: number,
        address: string,
        city: string,
        region_code: string,
        region_name: string,
        zipcode: string,
        zoom_level: number,
        phone: string,
        email: string,
        images: arrayOf(string),
        brand: shape({
            uid: string
        }),
        schedule: arrayOf(
            shape({
                uid: string,
                day: string,
                status: bool,
                open: string,
                break_starts: string,
                break_ends: string,
                close: string
            })
        ),
        holidays: arrayOf(
            shape({
                id: number,
                name: string,
                date_from: string,
                date_to: string,
                comment: string
            })
        ),
        specialDays: arrayOf(
            shape({
                id: number,
                comment: string,
                name: string,
                date_from: string,
                date_to: string,
                time_open: string,
                time_close: string
            })
        ),
        isLoading: bool,
        getPickupStoreError: string,
        userLocation: shape({
            latitude: number,
            longitude: number
        }),
        notice_banner: string
    }),
    children: node
};

const mapStateToProps = ({ pickupStore }) => ({
    pickupStoreState: pickupStore
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PickupStoreContextProvider);

/**
 * @typedef {Object} PickupStoreBrand
 *
 * @property {string} uid
 */

/**
 * @typedef {Object} PickupStoreSchedule
 *
 * @property {string} uid
 * @property {string} day
 * @property {bool} status
 * @property {string} open
 * @property {string} break_starts
 * @property {string} break_ends
 * @property {string} break_close
 */

/**
 * @typedef {Object} PickupStoreHoliday
 *
 * @property {number} id
 * @property {string} name
 * @property {string} date_from
 * @property {string} date_to
 * @property {string} comment
 */

/**
 * @typedef {Object} PickupStoreSpecialDay
 *
 * @property {number} id
 * @property {string} name
 * @property {string} comment
 * @property {string} date_from
 * @property {string} date_to
 * @property {string} time_open
 * @property {string} time_close
 */

/**
 * @typedef {Object} UserLocation
 *
 * @property {string} latitude Current user location latitude
 * @property {string} longitude Current user location longitude
 */

/**
 * @typedef {Object} PickupStoreState
 *
 * @property {number} id Current pickup store ID
 * @property {string} url_key Current pickup url key
 * @property {string} store_number Current pickup store number
 * @property {string} latitude Current pickup store latitude
 * @property {string} longitude Current pickup store longitude
 * @property {string} address Current pickup store street
 * @property {string} city Current pickup store city
 * @property {string} region_code Current pickup store region ID
 * @property {string} region_name Current pickup store region name
 * @property {string} zipcode Current pickup store ZIP code
 * @property {string} zoom_level Current pickup store zoom level for google maps
 * @property {string} phone Current pickup store phone number
 * @property {string} email Current pickup store email
 * @property {string} allow_curbside Is curbside enabled in current pickup store
 * @property {boolean} allow_pickup Is curbside enabled in current pickup store
 * @property {Array<string>} images Current pickup store images
 * @property {PickupStoreBrand} brand Current pickup store brand
 * @property {Array<PickupStoreSchedule>} schedule Current pickup store schedule
 * @property {Array<PickupStoreHoliday>} holidays Current pickup store holidays
 * @property {Array<PickupStoreSpecialDay>} specialDays Current pickup store special days
 * @property {boolean} isLoading Request loading state
 * @property {Error} getPickupStoreError Get Details call related error
 * @property {UserLocation} userLocation Get current user location
 */

/**
 * @typedef {Object} PickupStoreActions
 *
 * @property {Function} reset
 * @property {Function} updateUserLocation
 * @property {Function} getPickupStoreDetails
 */

/**
 * @returns {[PickupStoreState, PickupStoreActions]}
 */
export const usePickupStoreContext = () => useContext(PickupStoreContext);
