module.exports = targets => {
    targets.of('@magebit/events').events.tap(
        /**
         * @param {EventMapBuilder} events
         * @see packages/@magebit/events/lib/targets/EventMapBuilder.js
         */
        events => {
            events.add({
                type: 'USER_SIGN_IN',
                path: '@magebit/gtm/lib/events/customer',
                method: 'signInSubmit'
            });

            events.add({
                type: 'USER_CREATE_ACCOUNT_CLICK',
                path: '@magebit/gtm/lib/events/customer',
                method: 'createAccountClick'
            });

            events.add({
                type: 'USER_CREATE_ACCOUNT_FORM_BEGIN',
                path: '@magebit/gtm/lib/events/customer',
                method: 'createAccountForm'
            });

            events.add({
                type: 'USER_CREATE_ACCOUNT',
                path: '@magebit/gtm/lib/events/customer',
                method: 'createAccountSubmit'
            });

            events.add({
                type: 'SIGNUP_FIND_MY_ACCOUNT',
                path: '@magebit/gtm/lib/events/customer',
                method: 'findMyAccountSubmit'
            });

            events.add({
                type: 'SIGNUP_THATS_ME',
                path: '@magebit/gtm/lib/events/customer',
                method: 'thatsMeSubmit'
            });

            events.add({
                type: 'SIGNUP_TRY_AGAIN',
                path: '@magebit/gtm/lib/events/customer',
                method: 'tryAgain'
            });

            events.add({
                type: 'SWITCH_TABS__authModalTabs',
                path: '@magebit/gtm/lib/events/customer',
                method: 'authModalTabSwitch'
            });
        }
    );
};
