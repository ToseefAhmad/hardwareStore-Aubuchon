import { dataLayerPush } from "../utils";

export const storeChangeClick = async () => dataLayerPush({ event: 'storeChangeClick' });
export const viewStoreFinder = async () => dataLayerPush({ event: 'viewStoreFinder' });
export const storeSwitcherCallStore = async () => dataLayerPush({ event: 'storeSwitcherCallStore' });
export const storeSwitcherDetails = async () => dataLayerPush({ event: 'storeSwitcherDetails' });
export const storeDetailCall = async () => dataLayerPush({ event: 'storeDetailCall' });
export const storeDetailEmail = async () => dataLayerPush({ event: 'storeDetailEmail' });
export const storeDetailGetDirections = async () => dataLayerPush({ event: 'storeDetailGetDirections' });
export const storeDetailMakeMyStore = async () => dataLayerPush({ event: 'storeDetailMakeMyStore' });
