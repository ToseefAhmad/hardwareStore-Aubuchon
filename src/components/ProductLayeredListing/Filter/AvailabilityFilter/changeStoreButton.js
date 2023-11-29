import React, { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { StoreSmall } from '@app/components/Icons';
import { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './changeStore.module.css';

const ChangeStoreButton = () => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleToggleStoreSwitcherDialog = useCallback(() => {
        toggleModal({
            identifier: MODAL_NAMES.storeSwitcher
        });
    }, [toggleModal]);

    return (
        <Button
            priority="normal"
            onPress={handleToggleStoreSwitcherDialog}
            classes={{
                content: classes.content
            }}
        >
            <span className={classes.icon}>
                <Icon src={StoreSmall} />
            </span>
            <span>Change Store</span>
        </Button>
    );
};

export default ChangeStoreButton;
