import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowSize } from '@magento/peregrine';
import { getSearchParam } from '@magento/peregrine/lib/hooks/useSearchParam';
import { Meta } from '@magento/venia-ui/lib/components/Head';

import { StoreTitle } from '@app/components/Head';
import ProductLayeredListing from '@app/components/ProductLayeredListing';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './searchPage.module.css';

const SearchPage = () => {
    const location = useLocation();
    const searchTerm = getSearchParam('query', location);

    // Memoize to avoid renders from search param updates
    const queryVariable = useMemo(() => ({ search: searchTerm }), [searchTerm]);

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const title = <strong className={classes.strong}>“{searchTerm}”</strong>;
    const titleComponent = isMobile ? (
        <span className={classes.title}>{title}</span>
    ) : (
        <span className={classes.title}>Search results for {title}</span>
    );

    return (
        <>
            <StoreTitle>{`"${searchTerm}" search results`}</StoreTitle>
            <Meta name="title" content={`"${searchTerm}" search results`} />
            <Meta
                name="description"
                content={`"${searchTerm}" search results at HardwareStore.com`}
            />
            <ProductLayeredListing
                queryVariable={queryVariable}
                title={searchTerm}
                titleComponent={titleComponent}
            />
        </>
    );
};

export default SearchPage;
