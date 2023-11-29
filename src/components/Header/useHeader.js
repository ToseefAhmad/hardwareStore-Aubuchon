import { useCallback } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import { useTailwindContext } from '@app/context/tailwind';

const SIZES = {
    small: { width: 118, height: 24 },
    large: { width: 157, height: 32 }
};

export const useHeader = () => {
    const [
        { hasBeenOffline, isOnline, isPageLoading, isSearchHidden }
    ] = useAppContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const isTablet = innerWidth < screens.xl;

    const headerLogoSize = isTablet ? SIZES.small : SIZES.large;

    const {
        elementRef: searchRef,
        expanded: isSearchOpen,
        setExpanded: setIsSearchOpen,
        triggerRef: searchTriggerRef
    } = useDropdown();

    const handleSearchTriggerClick = useCallback(() => {
        // Toggle the Search input form.
        setIsSearchOpen(isOpen => !isOpen);
    }, [setIsSearchOpen]);

    return {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        searchRef,
        searchTriggerRef,
        headerLogoSize,
        isMobile,
        isSearchHidden
    };
};
