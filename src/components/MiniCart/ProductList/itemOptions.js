import classnames from 'classnames';
import parse from 'html-react-parser';
import { arrayOf, shape, string } from 'prop-types';
import React, { useMemo } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './itemOptions.module.css';

const ItemOptions = props => {
    const { customizableOptions, configurableOptions } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const options = useMemo(() => {
        const data = [];
        configurableOptions.forEach(option => {
            data.push({
                label: option.option_label,
                value: option.value_label
            });
        });
        customizableOptions.forEach(option => {
            const color = option.values[1]?.value || null;
            data.push({
                label: option.label,
                value: parse(option.values[0].value),
                color: color
            });
        });

        return data;
    }, [customizableOptions, configurableOptions]);

    const optionItems = useMemo(() => {
        if (options.length) {
            return options.map((option, key) => (
                <div
                    className={classnames(classes.item, {
                        [classes.colorItem]: option?.color
                    })}
                    key={key}
                >
                    <span className={classes.label}>{option.label}:</span>
                    <span className={classes.value}>
                        {option?.color && (
                            <span
                                className={classes.color}
                                style={{ background: option?.color }}
                            />
                        )}{' '}
                        {option.value}
                    </span>
                </div>
            ));
        }
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
