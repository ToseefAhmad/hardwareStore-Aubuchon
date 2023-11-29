import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Trash = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0C2.89539 0 2 0.895416 2 2V4H1C0.447754 4 0 4.44772 0 5C0 5.55228 0.447754 6 1 6V14C1 15.1046 1.89539 16 3 16H11C12.1046 16 13 15.1046 13 14V6C13.5522 6 14 5.55228 14 5C14 4.44772 13.5522 4 13 4H12V2C12 0.895416 11.1046 0 10 0H4ZM11 6H3V14H11V6ZM10 4H4V2H10V4ZM4 8C4 7.44772 4.44775 7 5 7C5.55225 7 6 7.44772 6 8V12C6 12.5523 5.55225 13 5 13C4.44775 13 4 12.5523 4 12V8ZM9 7C8.44775 7 8 7.44772 8 8V12C8 12.5523 8.44775 13 9 13C9.55225 13 10 12.5523 10 12V8C10 7.44772 9.55225 7 9 7Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Trash.propTypes = {
    color: PropTypes.string
};

Trash.displayName = 'Trash';

export default Trash;
