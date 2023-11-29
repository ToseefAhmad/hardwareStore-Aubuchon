import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Store = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2C0 0.895431 0.89543 0 2 0H28C29.1046 0 30 0.89543 30 2V4.5C30 6.98529 27.9853 9 25.5 9C24.0864 9 22.825 8.34814 22 7.32867C21.175 8.34814 19.9136 9 18.5 9C17.0864 9 15.825 8.34821 15 7.32867C14.175 8.34821 12.9136 9 11.5 9C10.0864 9 8.82498 8.34821 8 7.32867C7.17502 8.34821 5.91364 9 4.5 9C2.01472 9 0 6.98529 0 4.5V2ZM2 4.5V2H7V4.5C7 5.88074 5.88071 7 4.5 7C3.11929 7 2 5.88074 2 4.5ZM9 4.5C9 5.88074 10.1193 7 11.5 7C12.8807 7 14 5.88074 14 4.5V2H9V4.5ZM18.5 7C17.1193 7 16 5.88074 16 4.5V2H21V4.5C21 5.88074 19.8807 7 18.5 7ZM23 4.5C23 5.88074 24.1193 7 25.5 7C26.8807 7 28 5.88074 28 4.5V2H23V4.5ZM4 12C4 11.4477 3.55228 11 3 11C2.44772 11 2 11.4477 2 12V28C2 29.1046 2.89543 30 4 30H26C27.1046 30 28 29.1046 28 28V12C28 11.4477 27.5523 11 27 11C26.4477 11 26 11.4477 26 12V28H19V20C19 18.8954 18.1046 18 17 18H13C11.8954 18 11 18.8954 11 20V28H4V12ZM13 28H17V20H13V28Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Store.propTypes = {
    color: PropTypes.string
};

Store.displayName = 'Store';

export default Store;
