import classnames from 'classnames';
import { string, node, shape, func } from 'prop-types';
import React, { useCallback } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useAccordionContext } from '@magento/venia-ui/lib/components/Accordion/accordion';

import Icon from '@app/components/Icon';
import { CaretUp } from '@app/components/Icons';

import defaultClasses from './section.module.css';

const Section = props => {
    const { children, id, title, handleClick, ...restProps } = props;

    const classes = useStyle(defaultClasses, props.classes);

    // Remove isOpen from restProps to avoid having it in the root container
    delete restProps.isOpen;

    const { handleSectionToggle, openSectionIds } = useAccordionContext();

    const handleSectionToggleWithId = useCallback(() => {
        handleSectionToggle(id);
        handleClick && handleClick(id);
    }, [handleClick, handleSectionToggle, id]);

    const isOpen = openSectionIds.has(id);

    const contentsContainerClass = isOpen
        ? classes.contents_container
        : classes.contents_container_closed;

    return (
        <div
            className={classnames([isOpen && classes.open, classes.root])}
            {...restProps}
        >
            <button
                className={classes.title_container}
                onClick={handleSectionToggleWithId}
                type="button"
            >
                <span className={classes.title_wrapper}>
                    <span className={classes.title}>{title}</span>
                    <Icon
                        src={CaretUp}
                        size={24}
                        classes={{
                            icon: isOpen ? classes.iconOpen : classes.iconClose
                        }}
                    />
                </span>
            </button>
            <div className={contentsContainerClass}>{children}</div>
        </div>
    );
};

Section.propTypes = {
    children: node,
    id: string.isRequired,
    title: node || string,
    handleClick: func,
    classes: shape({
        root: string,
        title_container: string,
        title_wrapper: string,
        title: string,
        contents_container: string,
        contents_container_closed: string
    })
};

export default Section;
