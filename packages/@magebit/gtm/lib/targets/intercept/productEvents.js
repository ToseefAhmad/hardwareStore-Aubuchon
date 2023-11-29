module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'CHECK_NEARBY_STORES_CLICK',
                path: '@magebit/gtm/lib/events/product',
                method: 'checkNearbyStoresClick'
            });
        }
    );
};
