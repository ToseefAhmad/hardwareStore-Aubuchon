import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ShoppingBagLarge = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="50"
                viewBox="0 0 44 50"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32 10C32 4.47705 27.5229 0 22 0C16.4771 0 12 4.47705 12 10H3.81323C2.74316 10 1.86108 10.8555 1.80615 11.9463L0.00268544 47.8438C-0.0561524 49.0161 0.859375 50 2.00977 50H41.9902C43.1406 50 44.0562 49.0161 43.9973 47.8438L42.1938 11.9463C42.1389 10.8555 41.2568 10 40.1868 10H32ZM22 2C26.4182 2 30 5.58154 30 10H14C14 5.58154 17.5818 2 22 2ZM3.80371 12.0464L2.00024 47.9438C1.99927 47.9619 2.00195 47.9722 2.00439 47.979C2.00757 47.9868 2.01196 47.9937 2.01782 48H41.9822C41.988 47.9937 41.9924 47.9868 41.9956 47.979L41.9983 47.9697C41.9995 47.9634 42.0005 47.9551 41.9998 47.9438L40.1963 12.0464C40.1956 12.0312 40.1924 12.022 40.1897 12.0156C40.1865 12.0088 40.1824 12.0034 40.1787 12H3.82129L3.8147 12.0073L3.8103 12.0156C3.80762 12.022 3.80444 12.0312 3.80371 12.0464ZM12.0493 18.9985C11.9946 18.4492 12.4478 18 13 18C13.5522 18 13.9934 18.4502 14.0615 18.998C14.5527 22.9453 17.9197 26 22 26C26.0803 26 29.4473 22.9453 29.9385 18.998C30.0066 18.4502 30.4478 18 31 18C31.5522 18 32.0054 18.4492 31.9507 18.9985C31.4497 24.0527 27.186 28 22 28C16.814 28 12.5503 24.0527 12.0493 18.9985Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

ShoppingBagLarge.propTypes = {
    color: PropTypes.string
};

ShoppingBagLarge.displayName = 'ShoppingBagLarge';

export default ShoppingBagLarge;