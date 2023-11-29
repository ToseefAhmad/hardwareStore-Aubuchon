import classnames from 'classnames';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';

import classes from './item.module.css';

const Item = ({ setActiveOption, item, isSelected }) => {
    return (
        <Button
            type="button"
            key={item.value}
            onPress={() => setActiveOption(item)}
            className={classnames(classes.root, {
                [classes.swatchSelected]: isSelected
            })}
            classes={{
                content: classes.content
            }}
        >
            <span>
                <span
                    className={classes.swatchColor}
                    style={{ backgroundColor: item.hex }}
                />
                <span className={classes.label}>{item.label}</span>
            </span>
        </Button>
    );
};

Item.defaultProps = {
    setActiveOption: () => {}
};

Item.propTypes = {
    setActiveOption: func,
    item: shape({
        uid: string,
        label: string,
        hex: string,
        linked_value: oneOfType([number, string])
    }),
    isSelected: bool
};

export default Item;
