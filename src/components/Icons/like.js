import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Like = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.02838 6.00001C7.02838 7.10458 7.92744 8.00001 9.03649 8.00001H13L11.5 14L6.01624 13.9999V7.39267L7.02838 4.50001V6.00001ZM11.4848 15.9999C12.4063 15.9999 13.2095 15.3753 13.433 14.485L14.9391 8.48509C15.2559 7.22279 14.2973 6.00001 12.9909 6.00001L9 6V1.97161C9 0.882721 8.11728 0 7.02838 0L4.00634 7.00001H2.01289C0.903319 7.00001 0.00364826 7.89471 0.00298843 8.99882L3.63167e-07 13.9988C-0.000660025 15.1039 0.899409 16 2.00992 16L11.4848 15.9999ZM4.01469 9.00001H2.00479V14H4.01469V9.00001Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Like.propTypes = {
    color: PropTypes.string
};

Like.displayName = 'Like';

export default Like;
