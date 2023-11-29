import React from 'react';

import Button from '@app/components/Button';
import { useClosestStoreSwitcher } from '@app/components/ClosestStoreSwitcher/useClosestStoreSwitcher';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './closestStoreSwitcher.module.css';

/*
 * This component compares the current store set on a browser with the closest
 * store to a location determined by browser and offers user to switch stores
 * */
const ClosestStoreSwitcher = () => {
    const {
        closestStoreName,
        currentStoreName,
        handleSwitchToClosestStore,
        handleCloseModal
    } = useClosestStoreSwitcher();

    return (
        <SimpleModal
            fullHeight={false}
            modalName={MODAL_NAMES.closestStoreSwitcher}
        >
            <div className={classes.root}>
                <div className={classes.text}>
                    <p>
                        It appears that the nearest store to your location is{' '}
                        <span className={classes.storeName}>
                            {closestStoreName}
                        </span>
                    </p>
                </div>
                <Button priority="high" onClick={handleSwitchToClosestStore}>
                    Switch to {closestStoreName}
                </Button>
                <Button onClick={handleCloseModal}>
                    Stay in {currentStoreName}
                </Button>
            </div>
        </SimpleModal>
    );
};

export default ClosestStoreSwitcher;
