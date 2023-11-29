import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import {
    Menu as MenuIcon,
    MenuBold as MenuBoldIcon
} from '@app/components/Icons';
import { useNavigationTrigger } from '@app/talons/Header/useNavigationTrigger';

import defaultClasses from './navTrigger.module.css';

/**
 * A component that toggles the navigation menu.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const NavigationTrigger = props => {
    const {
        handleOpenNavigation,
        isHover,
        isOpen,
        setIsHover
    } = useNavigationTrigger();

    const classes = useStyle(defaultClasses, props.classes);
    return (
        <button
            className={classes.root}
            aria-label="Toggle navigation panel"
            aria-expanded={isOpen}
            aria-controls="navigation"
            onClick={handleOpenNavigation}
            onMouseOver={() => {
                setIsHover(true);
            }}
            onFocus={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
            onBlur={() => {
                setIsHover(false);
            }}
        >
            <div className={classes.desktop}>
                <Icon
                    src={MenuIcon}
                    attrs={{
                        isHover
                    }}
                />
            </div>
            <div className={classes.mobile}>
                <Icon
                    src={MenuBoldIcon}
                    attrs={{
                        isHover
                    }}
                />
            </div>
        </button>
    );
};

NavigationTrigger.propTypes = {
    children: node,
    classes: shape({
        root: string,
        desktop: string,
        mobile: string
    })
};

export default NavigationTrigger;
