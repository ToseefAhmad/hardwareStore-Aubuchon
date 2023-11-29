import classnames from 'classnames';
import { bool, number, shape, string } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import Checkbox from '@app/components/Checkbox';
import Rating from '@app/components/ProductCard/Rating';

import classes from './filterDefault.module.css';

const FilterDefault = ({ isSelected, item, group, ...restProps }) => {
    const { label, value_index, count } = item || {};
    const { formatMessage } = useIntl();
    const isRating = group === 'turnto_average_rating';
    const fieldState = useFieldState(`${label}-${value_index}`);

    const ariaLabel = !isSelected
        ? formatMessage(
              {
                  id: 'filterModal.item.applyFilter',
                  defaultMessage: 'Apply filter "{optionName}".'
              },
              {
                  optionName: label
              }
          )
        : formatMessage(
              {
                  id: 'filterModal.item.clearFilter',
                  defaultMessage: 'Remove filter "{optionName}".'
              },
              {
                  optionName: label
              }
          );
    const formattedLabel = isRating
        ? label.replace(/ Star(s)?|[0-9]?/gi, '')
        : label;
    const ratingValue = +label.split([' '])[0];

    const children = (
        <>
            {count > 0 && (
                <span className={classes.labelContainer}>
                    <span
                        className={classnames(classes.labelLine, {
                            [classes.labelActive]: fieldState.value,
                            [classes.labelWithRating]: isRating
                        })}
                        role="none"
                        onMouseDown={restProps.onMouseDown}
                    >
                        {isRating && (
                            <Rating
                                rating={ratingValue}
                                classes={{ root: classes.rootRating }}
                            />
                        )}
                        {formattedLabel}
                    </span>
                    <span
                        className={classnames(classes.count, {
                            [classes.countWithoutLabel]: !formattedLabel
                        })}
                    >
                        {count !== Infinity ? count : '...'}
                    </span>
                </span>
            )}
        </>
    );

    return (
        <Checkbox
            classes={{
                root: classes.checkboxRoot,
                checkbox: classes.checkboxLabel,
                icon: classes.checkboxIcon
            }}
            field={`${label}-${value_index}`}
            fieldValue={!!isSelected}
            label={label}
            rating={isRating}
            ariaLabel={ariaLabel}
            {...restProps}
        >
            {children}
        </Checkbox>
    );
};

FilterDefault.propTypes = {
    group: string,
    isSelected: bool,
    item: shape({
        count: number,
        label: string.isRequired,
        value_index: string.isRequired
    }).isRequired,
    label: string
};

export default FilterDefault;
