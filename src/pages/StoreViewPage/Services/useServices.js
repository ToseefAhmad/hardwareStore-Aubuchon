import { useCallback, useRef, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { smoothScroll } from '@app/utils/smooth-scroll';

/**
 * StoreViewPage - Services component talon
 */
export const useServices = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const listRef = useRef(null);

    const [isExpanded, setIsExpanded] = useState(false);

    /**
     * Method for changing isExpanded state of the services list
     */
    const toggleExpanded = useCallback(async () => {
        if (isMobile && isExpanded) {
            await smoothScroll({
                to: { y: listRef.current.offsetTop - 180 },
                duration: 750
            });
        }

        setIsExpanded(prevState => !prevState);
    }, [isExpanded, isMobile]);

    return {
        listRef,
        isMobile,
        isExpanded,
        toggleExpanded
    };
};
