import { useEffect, useCallback } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useTailwindContext } from '@app/context/tailwind';

const browserVersions = {
    desktop: {
        chrome: '113',
        firefox: '114',
        edge: '114',
        safari: '15'
    },
    mobile: {
        chrome: '114',
        firefox: '115',
        safari: '10'
    }
};
export const useCheckBrowserCompatibilty = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.xl;
    const userAgent = navigator.userAgent;
    const match = userAgent.match(
        /(chrome|firefox|edge|safari(?=\/))\/?\s*(\d+)/i
    );
    const browserName = (match && match[1].toLowerCase()) || '';
    const browserVersion = (match && match[2]) || '';
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleCloseModal = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const handleUpdate = useCallback(() => {
        toggleModal();
        globalThis.open(
            `https://www.google.com/search?q=update+${browserName}`,
            '_blank',
            'noreferrer'
        );
    }, [browserName, toggleModal]);

    useEffect(() => {
        if (!isMobile && browserName) {
            browserVersion <= browserVersions.desktop[browserName]
                ? toggleModal({ identifier: 'browserUpdateModal' })
                : null;
        }
        if (isMobile && browserName) {
            browserVersion <= browserVersions.desktop[browserName]
                ? toggleModal({ identifier: 'browserUpdateModal' })
                : null;
        }
    }, [browserName, browserVersion, isMobile, toggleModal]);

    return {
        handleCloseModal,
        handleUpdate
    };
};
