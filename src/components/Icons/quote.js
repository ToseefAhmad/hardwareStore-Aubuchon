import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Quote = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 2H12V10.8963L2 17.997V2ZM0 2C0 0.895431 0.895431 0 2 0H12C13.1046 0 14 0.895431 14 2V10.8963C14 11.5442 13.6862 12.1519 13.1579 12.527L3.15791 19.6277C1.83362 20.568 0 19.6211 0 17.997V2ZM18 2H28V10.8963L18 17.997V2ZM16 2C16 0.895431 16.8954 0 18 0H28C29.1046 0 30 0.895431 30 2V10.8963C30 11.5442 29.6862 12.1519 29.1579 12.527L19.1579 19.6277C17.8336 20.568 16 19.6211 16 17.997V2Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Quote.propTypes = {
    color: PropTypes.string
};

Quote.displayName = 'Quote';

export default Quote;
