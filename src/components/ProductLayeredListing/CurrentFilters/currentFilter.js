import { func, shape, string } from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Trigger from '@magento/venia-ui/lib/components/Trigger';

import Icon from '@app/components/Icon';
import { Remove } from '@app/components/Icons';

import defaultClasses from './currentFilter.module.css';
import { useCurrentFilter } from './useCurrentFilter';

const CurrentFilter = ({
    classes: propsClasses,
    group,
    item,
    name,
    removeItem,
    onRemove
}) => {
    const classes = useStyle(defaultClasses, propsClasses);
    const { formatMessage } = useIntl();
    const { formattedTitle } = useCurrentFilter(item, group);

    const handleClick = useCallback(() => {
        removeItem({ group, item });
        if (typeof onRemove === 'function') {
            onRemove(group, item);
        }
    }, [group, item, removeItem, onRemove]);

    const ariaLabel = formatMessage(
        {
            id: 'filterModal.action.clearFilterItem.ariaLabel',
            defaultMessage: 'Clear filter "{name}"'
        },
        {
            name: formattedTitle || item.title
        }
    );

    return (
        <span className={classes.root}>
            <span className={classes.text}>
                {name}:{' '}
                <strong className={classes.strong}>
                    {formattedTitle || item.title}
                </strong>
            </span>
            <Trigger action={handleClick} ariaLabel={ariaLabel}>
                <span className={classes.icon}>
                    <Icon src={Remove} />
                </span>
            </Trigger>
        </span>
    );
};

CurrentFilter.propTypes = {
    classes: shape({
        root: string
    }),
    onRemove: func,
    group: string,
    item: shape({}),
    name: string,
    removeItem: func
};

CurrentFilter.defaultProps = {
    onRemove: null
};

export default CurrentFilter;
