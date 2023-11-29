import classnames from 'classnames';
import { string } from 'prop-types';
import React from 'react';

import { ORDER_STATUSES } from '../constants';
import classes from './statusChip.module.css';

const StatusChip = props => {
    const { status } = props;

    return (
        <span
            className={classnames(classes.root, {
                [classes.highlight]: status === ORDER_STATUSES.ready_for_pickup
            })}
        >
            {status}
        </span>
    );
};

StatusChip.propTypes = {
    status: string.isRequired
};

export default StatusChip;
