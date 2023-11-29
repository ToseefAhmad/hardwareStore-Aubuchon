import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Percentage = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.5 7C5.43298 7 7 5.43298 7 3.5C7 1.56702 5.43298 0 3.5 0C1.56702 0 0 1.56702 0 3.5C0 5.43298 1.56702 7 3.5 7ZM3.5 5C4.32843 5 5 4.32837 5 3.5C5 2.67163 4.32843 2 3.5 2C2.67157 2 2 2.67163 2 3.5C2 4.32837 2.67157 5 3.5 5ZM14.7071 2.70715L2.70709 14.7072C2.31659 15.0977 1.68341 15.0977 1.29291 14.7072C0.902374 14.3165 0.902374 13.6835 1.29291 13.2928L13.2929 1.29285C13.6834 0.902344 14.3166 0.902344 14.7071 1.29285C15.0976 1.68347 15.0976 2.31653 14.7071 2.70715ZM16 12.5C16 14.433 14.433 16 12.5 16C10.567 16 9 14.433 9 12.5C9 10.567 10.567 9 12.5 9C14.433 9 16 10.567 16 12.5ZM14 12.5C14 13.3284 13.3284 14 12.5 14C11.6716 14 11 13.3284 11 12.5C11 11.6716 11.6716 11 12.5 11C13.3284 11 14 11.6716 14 12.5Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Percentage.propTypes = {
    color: PropTypes.string
};

Percentage.displayName = 'Percentage';

export default Percentage;
