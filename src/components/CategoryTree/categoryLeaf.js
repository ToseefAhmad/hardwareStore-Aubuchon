import { bool, func, shape, string } from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { ChevronRightSmall } from '@app/components/Icons';

import defaultClasses from './categoryLeaf.module.css';
import { useCategoryLeaf } from './useCategoryLeaf';

const Leaf = ({
    category,
    categoryUrlSuffix,
    classes: propsClasses,
    onNavigate,
    isListElement
}) => {
    const { name, url_path, children } = category;
    const classes = useStyle(defaultClasses, propsClasses);
    const { handleClick } = useCategoryLeaf({ category, onNavigate });
    const destination = resourceUrl(`/${url_path}${categoryUrlSuffix || ''}`);

    const leafLabel =
        children && children.length ? (
            <FormattedMessage
                id={'categoryLeaf.allLabel'}
                defaultMessage={'All {name}'}
                values={{
                    name: name
                }}
            />
        ) : (
            name
        );

    return (
        <Fragment>
            {isListElement ? (
                <li className={classes.root}>
                    <Link
                        className={classes.target}
                        data-cy="CategoryTree-Leaf-target"
                        to={destination}
                        onClick={handleClick}
                    >
                        <span className={classes.text}>{leafLabel}</span>
                        <span className={classes.icon}>
                            <Icon src={ChevronRightSmall} />
                        </span>
                    </Link>
                </li>
            ) : (
                <div className={classes.root}>
                    <Link
                        className={classes.target}
                        data-cy="CategoryTree-Leaf-target"
                        to={destination}
                        onClick={handleClick}
                    >
                        <span className={classes.text}>{leafLabel}</span>
                        <span className={classes.icon}>
                            <Icon src={ChevronRightSmall} />
                        </span>
                    </Link>
                </div>
            )}
        </Fragment>
    );
};

Leaf.propTypes = {
    category: shape({
        name: string.isRequired,
        url_path: string.isRequired
    }).isRequired,
    categoryUrlSuffix: string,
    classes: shape({
        root: string,
        target: string,
        text: string,
        icon: string
    }),
    onNavigate: func.isRequired,
    isListElement: bool
};

Leaf.defaultProps = {
    isListElement: true
};

export default Leaf;
