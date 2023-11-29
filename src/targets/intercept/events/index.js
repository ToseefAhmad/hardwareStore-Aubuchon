module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'PAGE_LOAD',
                path: '@app/events/fbPixel'
            });

            events.add({
                type: 'ROUTE_CHANGE',
                path: '@app/events/fbPixel',
                method: 'pageView'
            });
        }
    );
};
