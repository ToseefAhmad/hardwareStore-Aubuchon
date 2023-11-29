import { dataLayerPush } from "../utils";

const routeNotFound = async (payload) => {
    dataLayerPush({
        event: '404_page'
    });
}

export default routeNotFound;
