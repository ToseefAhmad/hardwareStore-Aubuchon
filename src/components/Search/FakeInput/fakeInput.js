import React, { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { FieldIcons } from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Search as SearchIcon } from '@app/components/Icons';

import classes from './fakeInput.module.css';

const FakeInput = () => {
    const [{ searchValue }, { toggleDrawer }] = useAppContext();

    const handleOpenSearchMobile = useCallback(() => {
        toggleDrawer('searchbox');
    }, [toggleDrawer]);

    const searchIcon = (
        <button aria-label="Search" onFocus={handleOpenSearchMobile}>
            <Icon src={SearchIcon} />
        </button>
    );

    return (
        <FieldIcons icon={searchIcon}>
            <input
                value={searchValue || ''}
                onFocus={handleOpenSearchMobile}
                className={classes.fakeInput}
                placeholder={'What can we help you find today?'}
                readOnly
            />
        </FieldIcons>
    );
};
export default FakeInput;
