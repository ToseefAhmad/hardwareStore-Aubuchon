import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Bookmark = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2ZM6 2H10V5.58579L8.70711 4.29289C8.31658 3.90237 7.68342 3.90237 7.29289 4.29289L6 5.58579V2ZM4 8V2H2V14H14V2H12V7.99931C12 7.99954 12 7.99977 12 8C12 8.25592 11.9024 8.51184 11.7071 8.70711C11.3166 9.09763 10.6834 9.09763 10.2929 8.70711L8 6.41421L5.70711 8.70711C5.31658 9.09763 4.68342 9.09763 4.29289 8.70711C4.09763 8.51184 4 8.25592 4 8Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Bookmark.propTypes = {
    color: PropTypes.string
};

Bookmark.displayName = 'Bookmark';

export default Bookmark;
