import { APP_ROUTER_PATHS } from '@app-constants';
import React, { lazy } from 'react';

import { CurbsidePickupShimmer } from '@app/components/CurbsidePickup';
import { OrderDetailsShimmer } from '@app/components/OrderDetails';

import AccountInformationPageShimmer from './AccountInformationPage/accountInformationPage.shimmer';
import AccountPageShimmer from './AccountPage/accountPage.shimmer';
import AddEditAddressPageShimmer from './AddEditAddressPage/addEditAddressPage.shimmer';
import AddressBookPageShimmer from './AddressBookPage/addressBookPage.shimmer';
import OrderHistoryPageShimmer from './OrderHistoryPage/orderHistoryPage.shimmer';
import RewardsPageShimmer from './RewardsPage/rewardsPage.shimmer';
import SavedPaymentsPageShimmer from './SavedPaymentsPage/savedPaymentsPage.shimmer';

export const ACCOUNT_PAGES_CONFIG = [
    {
        title: {
            id: 'accountPage.title',
            defaultMessage: 'Account'
        },
        meta_title: 'Account Summary',
        path: APP_ROUTER_PATHS.accountPage,
        exact: true,
        Component: lazy(() => import('./AccountPage')),
        ComponentShimmer: <AccountPageShimmer />
    },
    {
        title: {
            id: 'accountInformationPage.title',
            defaultMessage: 'Account Information'
        },
        path: APP_ROUTER_PATHS.accountInformation,
        exact: true,
        Component: lazy(() => import('./AccountInformationPage')),
        ComponentShimmer: <AccountInformationPageShimmer />
    },
    {
        title: {
            id: 'addressBookPage.title',
            defaultMessage: 'Address Book'
        },
        path: APP_ROUTER_PATHS.addressBook,
        exact: true,
        Component: lazy(() => import('./AddressBookPage')),
        ComponentShimmer: <AddressBookPageShimmer />
    },
    {
        title: {
            id: 'addressPage.title',
            defaultMessage: 'Edit Address'
        },
        path: APP_ROUTER_PATHS.addressPage,
        exact: true,
        Component: lazy(() => import('./AddEditAddressPage')),
        ComponentShimmer: <AddEditAddressPageShimmer />
    },
    {
        title: {
            id: 'addAddressPage.title',
            defaultMessage: 'Add New Address'
        },
        path: APP_ROUTER_PATHS.addAddressPage,
        exact: true,
        Component: lazy(() => import('./AddEditAddressPage')),
        ComponentShimmer: <AddEditAddressPageShimmer />
    },
    {
        title: {
            id: 'rewardsPage.title',
            defaultMessage: 'Rewards'
        },
        meta_title: 'Membership Rewards',
        path: APP_ROUTER_PATHS.rewardsPage,
        exact: true,
        Component: lazy(() => import('./RewardsPage')),
        ComponentShimmer: <RewardsPageShimmer />
    },
    {
        title: {
            id: 'SavedPaymentsPage.title',
            defaultMessage: 'Stored Payment Methods'
        },
        meta_title: 'Saved Payments',
        path: APP_ROUTER_PATHS.savedPaymentsPage,
        exact: true,
        Component: lazy(() => import('./SavedPaymentsPage')),
        ComponentShimmer: <SavedPaymentsPageShimmer />
    },
    {
        title: {
            id: 'ordersListPage.title',
            defaultMessage: 'Orders'
        },
        meta_title: 'Order History',
        path: APP_ROUTER_PATHS.orderHistory,
        exact: true,
        Component: lazy(() => import('./OrderHistoryPage')),
        ComponentShimmer: <OrderHistoryPageShimmer />
    },
    {
        title: {
            id: 'orderViewPage.title',
            defaultMessage: 'Order Information'
        },
        path: APP_ROUTER_PATHS.orderViewPage,
        exact: true,
        Component: lazy(() => import('./OrderViewPage')),
        ComponentShimmer: <OrderDetailsShimmer />
    },
    {
        title: {
            id: 'orderCurbsidePickupPage.title',
            defaultMessage: 'Order Pickup'
        },
        path: APP_ROUTER_PATHS.orderCurbsidePickupPage,
        exact: true,
        Component: lazy(() => import('./OrderCurbsidePickupPage')),
        ComponentShimmer: <CurbsidePickupShimmer />
    }
];
