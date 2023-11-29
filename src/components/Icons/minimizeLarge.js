import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const MinimizeLarge = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="2"
            viewBox="0 0 16 2"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0H0V2H16V0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

MinimizeLarge.propTypes = {
    color: PropTypes.string
};

MinimizeLarge.displayName = 'MinimizeLarge';

export default MinimizeLarge;
