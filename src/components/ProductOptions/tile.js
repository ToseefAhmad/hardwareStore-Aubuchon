import classnames from 'classnames';
import PropTypes, {
    bool,
    func,
    number,
    oneOfType,
    shape,
    string
} from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import { useTile } from '@app/talons/ProductOptions/useTile';

import classes from './tile.module.css';

const Tile = ({
    hasFocus,
    isSelected,
    item: { label, value_index },
    onClick,
    optionContainerRef,
    isOpen,
    setIsOpen
}) => {
    const { handleClick } = useTile({
        onClick,
        value_index,
        optionContainerRef,
        isOpen,
        setIsOpen
    });

    return (
        <Button
            className={classnames(classes.root, {
                [classes.root_selected]: isSelected,
                [classes.root_focused]: hasFocus
            })}
            classes={{
                content: classes.content
            }}
            onPress={handleClick}
            title={label}
            type="button"
        >
            <span>{label}</span>
        </Button>
    );
};

Tile.defaultProps = {
    hasFocus: false,
    isSelected: false,
    setIsOpen: () => {}
};

Tile.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: oneOfType([number, string]).isRequired
    }).isRequired,
    onClick: func.isRequired,
    optionContainerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    isOpen: bool,
    setIsOpen: func
};

export default Tile;
