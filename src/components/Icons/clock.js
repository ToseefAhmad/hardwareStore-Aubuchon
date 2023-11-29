import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Clock = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 8C16 12.4183 12.4183 16 8 16C3.58167 16 0 12.4183 0 8C0 3.58173 3.58167 0 8 0C12.4183 0 16 3.58173 16 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68628 14 2 11.3137 2 8C2 4.68628 4.68628 2 8 2C11.3137 2 14 4.68628 14 8ZM9 7V5C9 4.44769 8.55225 4 8 4C7.44775 4 7 4.44769 7 5V8C7 8.55231 7.44775 9 8 9H10C10.5522 9 11 8.55231 11 8C11 7.44769 10.5522 7 10 7H9Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Clock.propTypes = {
    color: PropTypes.string
};

Clock.displayName = 'Clock';

export default Clock;
