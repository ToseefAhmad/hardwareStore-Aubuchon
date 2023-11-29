import { array } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './schedule.module.css';
import { useStoreSchedule } from './useStoreSchedule';

const StoreSchedule = props => {
    const { schedule } = props;

    const { formattedSchedule } = useStoreSchedule({ schedule });

    return (
        <>
            <dl className={classes.item}>
                <dt>
                    <strong className={classes.strong}>
                        <FormattedMessage
                            id="storeSchedule.sunday"
                            defaultMessage="Sun:"
                        />
                    </strong>
                </dt>
                <dd>
                    {formattedSchedule.sunday.open} -{' '}
                    {formattedSchedule.sunday.close}
                </dd>
            </dl>
            <dl className={classes.item}>
                <dt>
                    <strong className={classes.strong}>
                        <FormattedMessage
                            id="storeSchedule.monFri"
                            defaultMessage="Mon - Fri:"
                        />
                    </strong>
                </dt>
                <dd>
                    {formattedSchedule.monday.open} -{' '}
                    {formattedSchedule.monday.close}
                </dd>
            </dl>
            <dl className={classes.item}>
                <dt>
                    <strong className={classes.strong}>
                        <FormattedMessage
                            id="storeSchedule.sat"
                            defaultMessage="Sat:"
                        />
                    </strong>
                </dt>
                <dd>
                    {formattedSchedule.saturday.open} -{' '}
                    {formattedSchedule.saturday.close}
                </dd>
            </dl>
        </>
    );
};

StoreSchedule.propTypes = {
    schedule: array.isRequired
};

export default StoreSchedule;
