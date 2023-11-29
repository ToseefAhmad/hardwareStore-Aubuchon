import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Beach = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 3.90804L18.7896 14H31.2104L25 3.90804ZM33.5588 14H38.3741L27.9848 4.94224L33.5588 14ZM22.0152 4.94224L16.4412 14H11.6259L22.0152 4.94224ZM24 16L8.98679 16C8.06821 16 7.6498 14.8131 8.35243 14.2005L24.3656 0.239693C24.7322 -0.0798981 25.2678 -0.0798973 25.6344 0.239693L41.6476 14.2005C42.3502 14.8131 41.9318 16 41.0132 16L26 16V37H42.5858L48.2929 31.2929C48.6834 30.9024 49.3166 30.9024 49.7071 31.2929C50.0976 31.6834 50.0976 32.3166 49.7071 32.7071L44 38.4142V49C44 49.5523 43.5523 50 43 50C42.4477 50 42 49.5523 42 49V45H2V49C2 49.5523 1.55228 50 1 50C0.447715 50 0 49.5523 0 49V38C0 37.4477 0.447715 37 1 37H24V16ZM2 43H42V39H2V43Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Beach.propTypes = {
    color: PropTypes.string
};

Beach.displayName = 'Beach';

export default Beach;
