import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

export const useMobileBreadcrumbs = () => {
    const { elementRef, expanded, setExpanded, triggerRef } = useDropdown();
    const location = useLocation();

    const toggleExpanded = useCallback(() => {
        setExpanded(prevState => !prevState);
    }, [setExpanded]);

    useEffect(() => {
        setExpanded(false);
    }, [location, setExpanded]);

    return {
        elementRef,
        expanded,
        triggerRef,
        toggleExpanded
    };
};
