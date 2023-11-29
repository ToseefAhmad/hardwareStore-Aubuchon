import { dataLayerPush } from "../utils";

const categoryNav = async (payload) => {
    dataLayerPush({
        event: `categoryNavClick`,
        category: {
            name: payload.name,
            level: payload.level
        }
    });

    dataLayerPush({
        event: `categoryNavClick_${payload.level}`,
        category: {
            name: payload.name
        }
    });
}

export default categoryNav;
