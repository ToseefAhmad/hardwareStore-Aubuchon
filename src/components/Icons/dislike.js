import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Dislike = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M7.97162 9.99999C7.97162 8.89542 7.07256 7.99999 5.96351 7.99999L2 7.99999L3.5 2L8.98376 2.00009L8.98376 8.60733L7.97162 11.5L7.97162 9.99999ZM3.51516 6.86142e-05C2.59371 7.6163e-05 1.79051 0.624669 1.56702 1.515L0.0609472 7.51491C-0.255909 8.77721 0.702678 9.99999 2.0091 9.99999L6 10L6 14.0284C6 15.1173 6.88272 16 7.97162 16L10.9937 8.99999L12.9871 8.99999C14.0967 8.99999 14.9964 8.10529 14.997 7.00118L15 2.00119C15.0007 0.89615 14.1006 -1.15227e-05 12.9901 -2.08306e-06L3.51516 6.86142e-05ZM10.9853 6.99999L12.9952 6.99999L12.9952 1.99998L10.9853 1.99998L10.9853 6.99999Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Dislike.propTypes = {
    color: PropTypes.string
};

Dislike.displayName = 'Dislike';

export default Dislike;
