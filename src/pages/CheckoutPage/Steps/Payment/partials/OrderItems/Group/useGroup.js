import { useCallback, useMemo, useState } from 'react';

export const useGroup = ({ items }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleSetShowAll = useCallback(() => {
        setShowAll(prevState => !prevState);
    }, [setShowAll]);

    const hiddenItemsCount = useMemo(
        () => (items?.length <= 4 || showAll ? null : items?.length - 3),
        [items?.length, showAll]
    );

    const hiddenCardsStartIndex = useMemo(() => (items?.length <= 4 ? 3 : 2), [
        items
    ]);

    return {
        showAll,
        toggleSetShowAll,
        hiddenItemsCount,
        hiddenCardsStartIndex
    };
};
