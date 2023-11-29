import classnames from 'classnames';
import { bool, func, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import {
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon
} from '@app/components/Icons';

import defaultClasses from './navButton.module.css';

const icons = new Map()
    .set('ChevronLeft', ArrowLeftIcon)
    .set('ChevronRight', ArrowRightIcon);

const NavButton = props => {
    const { active, buttonLabel, name, onClick } = props;
    const iconSrc = icons.get(name);
    const classes = useStyle(defaultClasses, props.classes);
    const iconClass = active ? classes.icon : classes.icon_disabled;

    return (
        <button
            aria-label={buttonLabel}
            className={classnames({
                [classes.root]: active,
                [classes.root_disabled]: !active
            })}
            disabled={!active}
            onClick={onClick}
            type="button"
        >
            <Icon className={iconClass} src={iconSrc} />
        </button>
    );
};

NavButton.propTypes = {
    classes: shape({
        root: string,
        root_disabled: string,
        icon: string,
        icon_disabled: string
    }),
    active: bool,
    buttonLabel: string,
    name: string,
    onClick: func
};

NavButton.defaultProps = {
    buttonLabel: 'move to another page'
};

export default NavButton;
