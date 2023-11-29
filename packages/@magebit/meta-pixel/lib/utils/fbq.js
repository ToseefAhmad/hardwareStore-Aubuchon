export const fbq = (...payload) => {
    if (!globalThis.fbq) {
        return;
    }

    globalThis.fbq(...payload);
}
