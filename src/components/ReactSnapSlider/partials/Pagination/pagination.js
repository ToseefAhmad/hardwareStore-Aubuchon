import classnames from 'classnames';
import { bool, func, number } from 'prop-types';
import React from 'react';

import classes from './pagination.module.css';

const SnapSliderPagination = props => {
    const { pages, activePage, moveToPage, disabled } = props;

    return (
        <div className={classes.root}>
            {[...Array(pages).keys()].map((page, idx) => (
                <button
                    key={page}
                    aria-label={`${
                        activePage === page ? 'Current slide, ' : ''
                    }Slide ${idx + 1}`}
                    className={classnames(classes.btn, {
                        [classes.active]: activePage === page
                    })}
                    onClick={() => moveToPage(page)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

SnapSliderPagination.propTypes = {
    pages: number.isRequired,
    activePage: number.isRequired,
    moveToPage: func.isRequired,
    disabled: bool
};

export default SnapSliderPagination;
