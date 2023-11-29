import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Car = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M4.5 0H1C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H3.5L7 6H14V7H13C12.4477 7 12 7.44772 12 8C12 8.55229 12.4477 9 13 9H14V11H10.874C10.4299 9.27477 8.86384 8 7 8C5.13616 8 3.57006 9.27477 3.12602 11H1C0.447715 11 0 11.4477 0 12C0 12.5523 0.447715 13 1 13H3.12602C3.57006 14.7252 5.13616 16 7 16C8.86384 16 10.4299 14.7252 10.874 13H15C15.5523 13 16 12.5523 16 12V5C16 4.44772 15.5523 4 15 4H10L11.5 2H14C14.5523 2 15 1.55228 15 1C15 0.447715 14.5523 0 14 0H10.5L7.5 3.5L4.5 0ZM9 12C9 13.1046 8.10457 14 7 14C5.89543 14 5 13.1046 5 12C5 10.8954 5.89543 10 7 10C8.10457 10 9 10.8954 9 12Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Car.propTypes = {
    color: PropTypes.string
};

Car.displayName = 'Car';

export default Car;
