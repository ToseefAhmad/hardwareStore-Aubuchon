import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Maximize = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0H5V5H0V7H5V12H7V7H12V5H7V0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Maximize.propTypes = {
    color: PropTypes.string
};

Maximize.displayName = 'Maximize';

export default Maximize;
