import { useCallback, useState } from 'react';

/**
 * OrderProducts component talon
 */
export const useOrderProducts = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    /**
     * Method for toggle isExpanded state
     */
    const toggleExpanded = useCallback(() => {
        setIsExpanded(prevState => !prevState);
    }, []);

    const openExpanded = useCallback(() => {
        setIsExpanded(true);
    }, []);

    return {
        isExpanded,
        toggleExpanded,
        openExpanded
    };
};
