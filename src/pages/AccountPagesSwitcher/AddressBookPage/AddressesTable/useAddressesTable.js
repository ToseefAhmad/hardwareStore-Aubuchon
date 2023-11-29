import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { smoothScroll } from '@app/utils/smooth-scroll';

export const useAddressesTable = ({ data }) => {
    const [page, setPage] = useState(1);

    const scrollAnchor = useRef(null);

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const paginatedData = useMemo(() => {
        const ITEMS_PER_PAGE = 5;
        const result = [];

        for (let i = 0; i < data.length; i += ITEMS_PER_PAGE) {
            result.push(data.slice(i, i + ITEMS_PER_PAGE));
        }

        return result;
    }, [data]);
    const pageData = paginatedData[page - 1] || [];
    const totalPages = paginatedData.length;

    const handleChangePage = useCallback(
        value => {
            setPage(value);
            isMobile &&
                smoothScroll({
                    to: { y: scrollAnchor.current.offsetTop - 180 },
                    duration: 750
                });
        },
        [isMobile]
    );

    useEffect(() => {
        totalPages < page && setPage(totalPages || 1);
    }, [totalPages, page]);

    return {
        scrollAnchor,
        pageData,
        currentPage: page,
        totalPages,
        handleChangePage
    };
};
