import { useCallback, useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

const NAVIGATION_MODAL_IDENTIFIER = 'nav';

export const useNavigationTrigger = () => {
    const [{ drawer }, { toggleDrawer }] = useAppContext();
    const [isHover, setIsHover] = useState(false);

    const handleOpenNavigation = useCallback(() => {
        toggleDrawer(NAVIGATION_MODAL_IDENTIFIER);
    }, [toggleDrawer]);

    return {
        handleOpenNavigation,
        isHover,
        isOpen: drawer === NAVIGATION_MODAL_IDENTIFIER,
        setIsHover
    };
};
