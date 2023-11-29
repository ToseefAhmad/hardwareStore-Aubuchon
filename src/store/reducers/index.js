import catalog from '@magento/peregrine/lib/store/reducers/catalog';
import checkout from '@magento/peregrine/lib/store/reducers/checkout';
import user from '@magento/peregrine/lib/store/reducers/user';

import app from './app';
import cart from './cart';
import pickupStore from './pickupStore';

const reducers = {
    app,
    cart,
    catalog,
    checkout,
    user,
    pickupStore
};

export default reducers;
