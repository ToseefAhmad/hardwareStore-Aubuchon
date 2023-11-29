module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'PAGE_LOAD',
                path: '@magebit/gtm/lib/events/dlReady'
            });

            events.add({
                type: 'ROUTE_NOT_FOUND',
                path: '@magebit/gtm/lib/events/route'
            });

            events.add({
                type: 'CATEGORY_NAVIGATION_CLICK',
                path: '@magebit/gtm/lib/events/categoryNav'
            });
        }
    );
};
