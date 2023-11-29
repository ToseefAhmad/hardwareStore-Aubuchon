import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const StoreSmall = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M0 0H2H6H10H14H16V2C16 3.10458 15.1046 4 14 4C12.8954 4 12 3.10458 12 2C12 3.10458 11.1046 4 10 4C8.89545 4 8 3.10458 8 2C8 3.10458 7.10455 4 6 4C4.89545 4 4 3.10458 4 2C4 3.10458 3.10455 4 2 4C0.895447 4 0 3.10458 0 2V0ZM2 7C2 6.44772 1.55228 6 1 6V6C0.447715 6 0 6.44772 0 7V14C0 15.1046 0.89543 16 2 16H5H11H14C15.1046 16 16 15.1046 16 14V7C16 6.44772 15.5523 6 15 6V6C14.4477 6 14 6.44772 14 7V14H11V10C11 8.89543 10.1046 8 9 8H7C5.89543 8 5 8.89543 5 10V14H2V7ZM7 14H9V10H7V14Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

StoreSmall.propTypes = {
    color: PropTypes.string
};

StoreSmall.displayName = 'StoreSmall';

export default StoreSmall;
