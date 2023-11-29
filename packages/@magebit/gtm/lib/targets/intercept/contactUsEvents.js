module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'CONTACT_US_DRIVING_LOCATIONS',
                path: '@magebit/gtm/lib/events/contact',
                method: 'drivingDirections'
            });

            events.add({
                type: 'CONTACT_US_EMAIL',
                path: '@magebit/gtm/lib/events/contact',
                method: 'email'
            });

            events.add({
                type: 'CONTACT_US_RETAIL_LOCATIONS',
                path: '@magebit/gtm/lib/events/contact',
                method: 'retailLocations'
            });
        }
    );
};
