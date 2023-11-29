import { bool, func, shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Trigger from '@magento/venia-ui/lib/components/Trigger';

import Icon from '@app/components/Icon';
import { ChevronLeftMenu, Close } from '@app/components/Icons';

import defaultClasses from './navHeader.module.css';
import { useNavigationHeader } from './useNavigationHeader';

const NavHeader = ({
    classes: propsClasses,
    isTopLevel,
    onBack,
    onClose,
    title,
    labelId
}) => {
    const { handleBack, handleClose } = useNavigationHeader({
        onBack,
        onClose
    });

    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <Fragment>
            {!isTopLevel && (
                <Trigger key="backButton" action={handleBack}>
                    <span className={classes.buttonBack}>
                        <Icon src={ChevronLeftMenu} />
                    </span>
                </Trigger>
            )}
            <span key="title" className={classes.title} id={labelId}>
                {title || 'Menu'}
            </span>
            <Trigger
                key="closeButton"
                action={handleClose}
                ariaLabel={'Close navigation'}
            >
                <span className={classes.button}>
                    <Icon src={Close} />
                </span>
            </Trigger>
        </Fragment>
    );
};

NavHeader.propTypes = {
    classes: shape({
        title: string,
        button: string,
        buttonBack: string
    }),
    isTopLevel: bool,
    onBack: func.isRequired,
    onClose: func,
    title: string,
    labelId: string.isRequired
};

export default NavHeader;
