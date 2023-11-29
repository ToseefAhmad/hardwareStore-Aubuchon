import { APP_ROUTER_PATHS } from '@app-constants';

const ACCOUNT_MENU_ITEMS = [
    {
        name: 'My Account',
        id: 'accountMenu.myAccount',
        url: APP_ROUTER_PATHS.accountPage
    },
    {
        name: 'Orders',
        id: 'accountMenu.orders',
        url: APP_ROUTER_PATHS.orderHistory
    },
    {
        name: 'Address Book',
        id: 'accountMenu.addressBook',
        url: APP_ROUTER_PATHS.addressBook
    },
    {
        name: 'Account Information',
        id: 'accountMenu.accountInformation',
        url: APP_ROUTER_PATHS.accountInformation
    },
    {
        name: 'Payments',
        id: 'accountMenu.payments',
        url: APP_ROUTER_PATHS.savedPaymentsPage
    },
    {
        name: 'Rewards',
        id: 'accountMenu.rewards',
        url: APP_ROUTER_PATHS.rewardsPage
    }
];

export const useAccountMenuItems = () => {
    return {
        menuItems: ACCOUNT_MENU_ITEMS
    };
};
