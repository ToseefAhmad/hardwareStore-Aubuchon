import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Lock = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 0C6.65685 0 8 1.34314 8 3V4C9.10457 4 10 4.89539 10 6V10C10 11.1046 9.10457 12 8 12H2C0.895432 12 0 11.1046 0 10V6C0 4.89539 0.895432 4 2 4V3C2 1.34314 3.34315 0 5 0ZM4 4V3C4 2.44775 4.44772 2 5 2C5.55228 2 6 2.44775 6 3V4H5H4ZM4 6H5H6H8V10H2V6H4ZM5 9C5.55228 9 6 8.55225 6 8C6 7.44775 5.55228 7 5 7C4.44772 7 4 7.44775 4 8C4 8.55225 4.44772 9 5 9Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Lock.propTypes = {
    color: PropTypes.string
};

Lock.displayName = 'Lock';

export default Lock;
