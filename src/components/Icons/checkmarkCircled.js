import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const CheckmarkCircled = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
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
                    d="M16 8C16 12.4183 12.4183 16 8 16C3.58173 16 0 12.4183 0 8C0 3.58173 3.58173 0 8 0C12.4183 0 16 3.58173 16 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68628 14 2 11.3137 2 8C2 4.68628 4.68628 2 8 2C11.3137 2 14 4.68628 14 8ZM11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289C11.3166 4.90237 10.6834 4.90237 10.2929 5.29289L7 8.58579L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

CheckmarkCircled.propTypes = {
    color: PropTypes.string
};

CheckmarkCircled.displayName = 'CheckmarkCircled';

export default CheckmarkCircled;
