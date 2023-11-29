module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'STORE_CHANGE_CLICK',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeChangeClick'
            });

            events.add({
                type: 'STORE_SELECTOR_VIEW_STORE_FINDER',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'viewStoreFinder'
            });

            events.add({
                type: 'STORE_SWITCHER_CALL_STORE',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeSwitcherCallStore'
            });

            events.add({
                type: 'STORE_SWITCHER_DETAILS',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeSwitcherDetails'
            });

            events.add({
                type: 'STORE_DETAIL_CALL',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeDetailCall'
            });

            events.add({
                type: 'STORE_DETAIL_EMAIL',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeDetailEmail'
            });

            events.add({
                type: 'STORE_DETAIL_GET_DIRECTIONS',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeDetailGetDirections'
            });

            events.add({
                type: 'STORE_DETAIL_MAKE_MY_STORE',
                path: '@magebit/gtm/lib/events/storelocator',
                method: 'storeDetailMakeMyStore'
            });
        }
    );
};
