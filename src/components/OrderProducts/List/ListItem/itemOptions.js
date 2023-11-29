import classnames from 'classnames';
import { arrayOf, shape, string } from 'prop-types';
import React, { useMemo } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './itemOptions.module.css';

const ItemOptions = props => {
    const { customizableOptions, configurableOptions } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const options = useMemo(() => {
        return [...configurableOptions, ...customizableOptions];
    }, [configurableOptions, customizableOptions]);

    const optionItems = useMemo(() => {
        return options.map(
            (option, key) =>
                option?.label !== 'color_code' && (
                    <div
                        className={classnames(classes.item, {
                            [classes.colorItem]: option?.color
                        })}
                        key={key}
                    >
                        {<span className={classes.label}>{option.label}:</span>}
                        <span className={classes.value}>
                            {option?.label === 'Color' && (
                                <span
                                    className={classes.color}
                                    style={{ background: option?.color }}
                                />
                            )}
                            {option?.value}
                        </span>
                    </div>
                )
        );
    }, [classes, options]);

    return (
        <div className={classes.root}>
            <div className={classes.list}>{optionItems}</div>
        </div>
    );
};

ItemOptions.propTypes = {
    classes: shape({
        item: string,
        list: string
    }),
    configurableOptions: arrayOf(
        shape({
            option_label: string,
            value_label: string
        })
    ),
    customizableOptions: arrayOf(
        shape({
            label: string,
            values: arrayOf(
                shape({
                    value: string
                })
            )
        })
    )
};

export default ItemOptions;
