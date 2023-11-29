import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Coupon = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 2H8V5H6V2H2V2.53516C3.19562 3.22681 4 4.51941 4 6C4 7.48059 3.19562 8.77319 2 9.46484V10H6V7H8V10H14V9.46484C12.8044 8.77319 12 7.48059 12 6C12 4.51941 12.8044 3.22681 14 2.53516V2ZM16 2C16 0.895386 15.1046 0 14 0H2C0.895416 0 0 0.895386 0 2V4C1.10458 4 2 4.89539 2 6C2 7.10461 1.10458 8 0 8V10C0 11.1046 0.895416 12 2 12H14C15.1046 12 16 11.1046 16 10V8C14.8954 8 14 7.10461 14 6C14 4.89539 14.8954 4 16 4V2Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Coupon.propTypes = {
    color: PropTypes.string
};

Coupon.displayName = 'Coupon';

export default Coupon;
