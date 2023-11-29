import classnames from 'classnames';
import { bool, func, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { ArrowRight } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './storeCardDropdown.module.css';

const StoreCardDropdown = props => {
    const {
        ariaIdentifier,
        description,
        name,
        primaryColor,
        aboutUsLink,
        firstElement,
        lastElement,
        uid
    } = props;

    const isFirstElement = firstElement === uid;
    const isLastElement = lastElement === uid;

    return (
        <div
            role="dialog"
            id={ariaIdentifier}
            className={classnames(classes.root, {
                [classes.firstElement]: isFirstElement,
                [classes.lastElement]: isLastElement
            })}
        >
            <h5 className={classes.title} style={{ color: primaryColor }}>
                {name}
            </h5>
            <div className={classes.description}>{description}</div>
            <Link
                className={classes.link}
                data-cy="CategoryTree-Leaf-target"
                to={aboutUsLink}
            >
                <div className={classes.linkContent}>
                    <span className={classes.text}>Learn More</span>
                    <span className={classes.icon}>
                        <Icon src={ArrowRight} />
                    </span>
                </div>
            </Link>
        </div>
    );
};

StoreCardDropdown.propTypes = {
    ariaIdentifier: string.isRequired,
    expanded: bool,
    setExpanded: func,
    description: string,
    name: string,
    primaryColor: string,
    aboutUsLink: string,
    firstElement: string,
    lastElement: string,
    uid: string
};

StoreCardDropdown.displayName = 'StoreCardDropdown';

export default StoreCardDropdown;
