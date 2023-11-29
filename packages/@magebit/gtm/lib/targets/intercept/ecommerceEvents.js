module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'CHECKOUT_INFO_STEP_ENTER',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'infoStepEnter'
            });

            events.add({
                type: 'CHECKOUT_INFO_STEP_CONTINUE_AS_GUEST',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'continueAsGuest'
            });

            events.add({
                type: 'CHECKOUT_INFO_STEP_LOOKUP',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'lookupCustomer'
            });

            events.add({
                type: 'CHECKOUT_PICKUP_STEP_ENTER',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'pickupStepEnter'
            });

            events.add({
                type: 'CHECKOUT_SELECT_SHIPPING_METHOD',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'selectShippingMethod'
            });

            events.add({
                type: 'CHECKOUT_SUBSCRIBE_TO_TEXT_UPDATE',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'subscribeToTextUpdates'
            });

            events.add({
                type: 'CHECKOUT_SELECT_PICKUP_PERSON',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'selectPickupPerson'
            });

            events.add({
                type: 'SHIPPING_METHOD_MUTATION',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'addShippingInfo'
            });

            events.add({
                type: 'PAYMENT_METHOD_MUTATION',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'addPaymentInfo'
            });

            events.add({
                type: 'ADD_TO_CART',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'addToCart'
            });

            events.add({
                type: 'CHECKOUT_PAGE',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'checkoutView'
            });

            events.add({
                type: 'PRODUCT_CLICK',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'productClick'
            });

            events.add({
                type: 'PDP_VIEW',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'productDetailView'
            });

            events.add({
                type: 'PRODUCTS_IMPRESSION',
                path: '@magebit/gtm/lib/events/productsImpression'
            });

            events.add({
                type: 'CHECKOUT_PURCHASE',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'purchase'
            });

            events.add({
                type: 'VIEW_CART',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'viewCart'
            });

            events.add({
                type: 'REMOVE_FROM_CART',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'removeFromCart'
            });

            events.add({
                type: 'KLEVU_PRODUCT_CLICK',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'klevuProductClick'
            });

            events.add({
                type: 'KLEVU_SEARCH_TERM',
                path: '@magebit/gtm/lib/events/ecommerce',
                method: 'klevuSearchTerm'
            });
        }
    );
};
