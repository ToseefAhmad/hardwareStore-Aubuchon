import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const CreditCard = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C0.895416 0 0 0.895386 0 2V12C0 13.1046 0.895416 14 2 14H14C15.1046 14 16 13.1046 16 12V2C16 0.895386 15.1046 0 14 0H2ZM14 2H2V4H14V2ZM2 12V6H14V12H2ZM12 8H8V10H12V8Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

CreditCard.propTypes = {
    color: PropTypes.string
};

CreditCard.displayName = 'CreditCard';

export default CreditCard;
