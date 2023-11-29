import { dataLayerPush } from "../utils";

export const checkNearbyStoresClick = async () => {
    dataLayerPush({
        event: 'checkNearbyStoresClick'
    });
};
