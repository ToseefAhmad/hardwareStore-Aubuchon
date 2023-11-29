const log = (event, listeners) => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    console.groupCollapsed(`Eventing: ${event.type}`);
    console.group('payload');
    console.log(event.payload);
    console.groupEnd();

    if (listeners) {
        console.groupCollapsed('listeners');
        console.log(listeners)
        console.groupEnd();
    }

    console.groupEnd();
};

export default log;
