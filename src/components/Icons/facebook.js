import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Facebook = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="16"
            viewBox="0 0 8 16"
            fill="none"
        >
            <path
                d="M5 5V3.5C5 3.23478 5.10536 2.98043 5.29289 2.79289C5.48043 2.60536 5.73478 2.5 6 2.5H7V0H5C4.20435 0 3.44129 0.31607 2.87868 0.87868C2.31607 1.44129 2 2.20435 2 3V5H0V8H2V16H5V8H7L8 5H5Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Facebook.propTypes = {
    color: PropTypes.string
};

Facebook.displayName = 'Facebook';

export default Facebook;
