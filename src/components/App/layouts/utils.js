import { matchPath } from 'react-router-dom';

import { APP_LAYOUTS, APP_LAYOUT_MATCHES } from './config';

export const getLayoutCode = ({ currentPath }) => {
    let value = APP_LAYOUTS.default;

    for (let i = 0; i < APP_LAYOUT_MATCHES.length; i++) {
        const match = matchPath(currentPath, {
            path: APP_LAYOUT_MATCHES[i].path,
            exact: true,
            strict: false
        });

        if (match?.isExact) {
            value = APP_LAYOUT_MATCHES[i].code;

            break;
        }
    }

    return value;
};
