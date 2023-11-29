import { ORDER_STATUS_CODES } from '@app-constants';
import classnames from 'classnames';
import { oneOf } from 'prop-types';
import React from 'react';

import classes from './statusProgressBar.module.css';
import { useStatusProgressBar } from './useStatusProgressBar';

const StatusProgressBar = props => {
    const { statusCode } = props;
    const { percentage } = useStatusProgressBar({ statusCode });

    return (
        <div className={classes.root}>
            <div
                className={classnames(classes.progressLine, {
                    [classes.progressLineFull]: percentage === 100,
                    [classes.progressLineEmpty]: percentage === 0
                })}
                style={{ width: `${percentage}%` }}
            >
                <p
                    className={classnames(classes.progressLineValue, {
                        [classes.progressLineEmptyValue]: percentage === 0
                    })}
                >
                    {percentage}%
                </p>
            </div>
        </div>
    );
};

StatusProgressBar.propTypes = {
    statusCode: oneOf(Object.values(ORDER_STATUS_CODES)).isRequired
};

export default StatusProgressBar;
