import React from 'react';
import { render } from 'react-dom';

import app from '@magento/peregrine/lib/store/actions/app';
import Adapter from '@magento/venia-ui/lib/components/Adapter';

import { registerPageBuilder } from '@app/pageBuilder';
import { populateUPWARDPickupStore } from '@app/utils/stores/handleStoreStorage';

import { registerSW } from './registerSW';
import { setupDayJs } from './setupDayJs';
import store from './store';
import './index.css';

// Register custom Page Builder components
registerPageBuilder();

// server rendering differs from browser rendering
const isServer = !globalThis.document;

// eslint-disable-next-line no-warning-comments
// TODO: on the server, the http request should provide the origin
const origin = isServer
    ? process.env.MAGENTO_BACKEND_URL
    : globalThis.location.origin;

// on the server, components add styles to this set and we render them in bulk
const styles = new Set();

const configureLinks = links => [...links.values()];

const tree = (
    <Adapter
        configureLinks={configureLinks}
        origin={origin}
        store={store}
        styles={styles}
    />
);

populateUPWARDPickupStore();

if (isServer) {
    // eslint-disable-next-line no-warning-comments
    // TODO: ensure this actually renders correctly
    import('react-dom/server').then(({ default: ReactDOMServer }) => {
        // eslint-disable-next-line no-console
        console.log(ReactDOMServer.renderToString(tree));
    });
} else {
    setupDayJs();
    render(tree, document.getElementById('root'));
    registerSW();

    globalThis.addEventListener('online', () => {
        store.dispatch(app.setOnline());
    });
    globalThis.addEventListener('offline', () => {
        store.dispatch(app.setOffline());
    });
}
