import { dataLayerPush } from "../utils";

export const drivingDirections = async () => {
    dataLayerPush({
        event: 'contact_us_driving_directions'
    });
};

export const email = async () => {
    dataLayerPush({
        event: 'contact_us_email'
    });
};

export const retailLocations = async () => {
    dataLayerPush({
        event: 'contact_us_stores'
    });
};
