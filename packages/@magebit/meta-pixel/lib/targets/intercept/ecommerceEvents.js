module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'ADD_TO_CART',
                path: '@magebit/meta-pixel/lib/events/ecommerce',
                method: 'addToCart'
            });
            events.add({
                type: 'CHECKOUT_PAGE',
                path: '@magebit/meta-pixel/lib/events/ecommerce',
                method: 'checkoutView'
            });
            events.add({
                type: 'CHECKOUT_PURCHASE',
                path: '@magebit/meta-pixel/lib/events/ecommerce',
                method: 'purchase'
            });
        }
    );
};
