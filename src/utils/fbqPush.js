const fbqQueue = new Set();
let initPayload = null;
let scheduled = false;
let timeoutId = null;

const processQueue = () => {
    fbqProcess(initPayload);
    fbqQueue.forEach(fbqProcess);
    fbqQueue.clear();
    initPayload = true;
};

const scheduleClearQueue = () => {
    if (!timeoutId) {
        // If fbq is not loaded in 30sec, it might be broken.
        setTimeout(() => clearTimeout(timeoutId), 30000);
    }

    timeoutId = setTimeout(() => {
        if (!globalThis.fbq || !initPayload) {
            scheduleClearQueue();
        } else {
            processQueue();
        }
    }, 100);
};

/**
 * @param {{method: string, event: string, data?: string|{}}} payload
 */
const fbqProcess = payload => {
    globalThis.fbq(payload.method, payload.event, payload.data);
};

/**
 * @param {{method: string, event: string, data?: string|{}}} payload
 */
export const fbqPush = (payload = {}) => {
    if (!globalThis.UPWARD?.fbPixelId) {
        return;
    }

    // Make sure init event is always the first event
    if (payload.method === 'init') {
        initPayload = {
            ...payload
        };

        // If init is fired, globalThis.fbq ready and queue is active, fire it right away and cancel scheduling
        if (globalThis.fbq && scheduled && fbqQueue.size > 0) {
            clearTimeout(timeoutId);
            processQueue();

            return;
        }
    }

    if (!globalThis.fbq || !initPayload) {
        fbqQueue.add(payload);

        if (!scheduled) {
            scheduled = true;
            scheduleClearQueue();
        }
    } else {
        fbqProcess(payload);
    }
};
