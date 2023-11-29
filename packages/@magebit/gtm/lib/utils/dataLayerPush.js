export const dataLayerPush = (payload) => {
    if (!globalThis.dataLayer) {
        return;
    }

    globalThis.dataLayer.push(payload);
}
