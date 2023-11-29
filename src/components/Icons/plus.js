import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Plus = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 0H3V3H0V5H3V8H5V5H8V3H5V0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Plus.propTypes = {
    color: PropTypes.string
};

Plus.displayName = 'Plus';

export default Plus;
