import { useCallback, useState, useEffect, useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';

export const useFilterBlock = ({
    filterState,
    items,
    initialOpen,
    setActiveFilter
}) => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const hasSelected = useMemo(() => {
        return items.some(item => {
            return filterState && filterState.has(item);
        });
    }, [filterState, items]);
    const [isExpanded, setExpanded] = useState(hasSelected || initialOpen);
    const isMobile = innerWidth < screens.lg;

    const handleClick = useCallback(
        group => {
            setExpanded(value => !value);
            setActiveFilter(group);
        },
        [setActiveFilter, setExpanded]
    );

    useEffect(() => {
        setExpanded(hasSelected || initialOpen);
    }, [hasSelected, initialOpen]);

    return {
        handleClick,
        isExpanded,
        isMobile
    };
};
