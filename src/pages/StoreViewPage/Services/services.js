import classnames from 'classnames';
import { arrayOf, number, shape, string } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';

import classes from './services.module.css';
import { useServices } from './useServices';

const Services = ({ services }) => {
    const { listRef, isMobile, isExpanded, toggleExpanded } = useServices();

    return (
        <>
            <div className={classes.root}>
                <p className={classes.title}>Services</p>
                <div className={classes.container}>
                    <ul ref={listRef} className={classes.list}>
                        {services.map((element, i) => (
                            <li
                                key={element.id}
                                className={classnames(classes.item, {
                                    [classes.hiddenItem]: !isExpanded && i > 4
                                })}
                            >
                                {element.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isMobile && services.length > 4 && (
                <div className={classes.serviceToggle}>
                    <Button
                        isShort={true}
                        classes={{ content: classes.buttonContent }}
                        onClick={toggleExpanded}
                    >
                        {!isExpanded ? 'View All' : 'Show Less'} Services
                    </Button>
                </div>
            )}
        </>
    );
};

Services.defaultProps = {
    services: []
};

Services.propTypes = {
    services: arrayOf(
        shape({
            id: number,
            name: string,
            description: string,
            icon: string
        })
    )
};

export default Services;
