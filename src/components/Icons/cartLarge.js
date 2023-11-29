import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const CartLarge = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.19769 1.77913C5.08514 0.766267 4.22902 0 3.20992 0H1C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H3L4.80232 18.2209C4.91486 19.2337 5.77099 20 6.79009 20H7H12C10.3431 20 9 21.3431 9 23C9 24.6569 10.3431 26 12 26C13.6569 26 15 24.6569 15 23C15 21.3431 13.6569 20 12 20H23C21.3431 20 20 21.3431 20 23C20 24.6569 21.3431 26 23 26C24.6569 26 26 24.6569 26 23C26 21.3431 24.6569 20 23 20H29C29.5523 20 30 19.5523 30 19C30 18.4477 29.5523 18 29 18H7L6.55554 14H26C27.0766 14 27.9233 13.0798 27.8339 12.0069L27.1528 3.83391C27.0664 2.79732 26.1999 2 25.1597 2H25H5.22223L5.19769 1.77913ZM25.8 12L25 4H5.44446L6.33331 12H25.8ZM12 24C12.5523 24 13 23.5522 13 23C13 22.4478 12.5523 22 12 22C11.4477 22 11 22.4478 11 23C11 23.5522 11.4477 24 12 24ZM24 23C24 23.5522 23.5523 24 23 24C22.4477 24 22 23.5522 22 23C22 22.4478 22.4477 22 23 22C23.5523 22 24 22.4478 24 23Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

CartLarge.propTypes = {
    color: PropTypes.string
};

CartLarge.displayName = 'CartLarge';

export default CartLarge;
