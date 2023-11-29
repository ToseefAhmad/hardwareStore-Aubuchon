import { bool, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './status.module.css';
import { useStoreStatus } from './useStoreStatus';

const StoreStatus = props => {
    const { classes: propClasses, isOpen, isHyphen, storeWorkInfo } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const { statusText, storeStatus } = useStoreStatus({
        isOpen,
        isHyphen,
        storeWorkInfo
    });

    const rootClass = isOpen ? classes.open : classes.close;

    return (
        <span className={rootClass}>
            {statusText}{' '}
            <span className={classes.workHours}>{storeStatus}</span>
        </span>
    );
};

StoreStatus.defaultProps = {
    isHyphen: true
};

StoreStatus.propTypes = {
    classes: shape({
        open: string,
        close: string,
        workHours: string
    }),
    isOpen: bool.isRequired,
    isHyphen: bool,
    storeWorkInfo: shape({
        specialDayComment: string,
        timeToOpen: string,
        timeToClose: string,
        isSundayClosed: bool
    })
};

export default StoreStatus;
