import { bool } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import FakeInput from '@app/components/Search/FakeInput';
import SearchModalDesktop from '@app/components/Search/SearchModalDesktop';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './search.module.css';

const Search = React.forwardRef((props, ref) => {
    const { isOpen } = props;

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} ref={ref}>
            {!isMobile ? (
                <SearchModalDesktop />
            ) : (
                <div className={classes.search}>
                    <FakeInput />
                </div>
            )}
        </div>
    );
});

Search.propTypes = {
    isOpen: bool
};

Search.displayName = 'Search';

export default Search;
