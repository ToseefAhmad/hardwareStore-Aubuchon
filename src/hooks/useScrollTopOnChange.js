import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { smoothScroll } from '@app/utils/smooth-scroll';

const isServer = !globalThis.document;

/**
 * A hook that scrolls to the top of the page when the watched argument changes.
 *
 * @param {any} watched item to observe for changes to run the scroll effect
 */
export const useScrollTopOnChange = watched => {
    const history = useHistory();

    useEffect(() => {
        if (isServer || history.action === 'POP') return;

        setTimeout(() => {
            // Prefer native smooth scrolling over JS implementation for performance reasons
            if (
                'scrollBehavior' in globalThis.document?.body?.style &&
                globalThis.scroll
            ) {
                globalThis.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                smoothScroll({
                    to: { y: 0 },
                    duration: 1250
                });
            }
        }, 0);
    }, [watched, history]);
};
