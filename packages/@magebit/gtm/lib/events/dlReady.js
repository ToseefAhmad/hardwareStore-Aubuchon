import { dataLayerPush } from "../utils";

const dlReady = async (payload) => {
    dataLayerPush({
        event: 'dlReady',
        page: {
            store_zip_code: payload.storeZipCode,
            user_id: payload.userId
        }
    });
}

export default dlReady;
