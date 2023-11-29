import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Alert = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 2L2 14H16L9 2ZM0.266284 13.0066L7.17119 1.03637C7.96828 -0.345458 10.0317 -0.345458 10.8288 1.03637L17.7337 13.0066C18.5084 14.3496 17.5001 16 15.9049 16H2.0951C0.499912 16 -0.508406 14.3496 0.266284 13.0066ZM10 12C10 12.5523 9.55229 13 9 13C8.44771 13 8 12.5523 8 12C8 11.4477 8.44771 11 9 11C9.55229 11 10 11.4477 10 12ZM9 5C8.44772 5 8 5.44772 8 6V9C8 9.55229 8.44772 10 9 10C9.55228 10 10 9.55229 10 9V6C10 5.44772 9.55228 5 9 5Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Alert.propTypes = {
    color: PropTypes.string
};

Alert.displayName = 'Alert';

export default Alert;
