import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const MaximizeLarge = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0H7V7H0V9H7V16H9V9H16V7H9V0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

MaximizeLarge.propTypes = {
    color: PropTypes.string
};

MaximizeLarge.displayName = 'MaximizeLarge';

export default MaximizeLarge;
