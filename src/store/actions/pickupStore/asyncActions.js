import actions from './actions';

export const getPickupStoreDetails = fetchPickupStoreDetails => {
    return async function thunk(dispatch) {
        // Indicate that we are starting to make async requests for the details.
        dispatch(actions.getPickupStoreDetails.request());

        const { data, errors } = await fetchPickupStoreDetails({
            fetchPolicy: 'network-only'
        });

        if (errors) {
            dispatch(actions.getPickupStoreDetails.receive(new Error(errors)));
        } else {
            const { pickupStore } = data;
            dispatch(actions.getPickupStoreDetails.receive(pickupStore));
        }
    };
};
