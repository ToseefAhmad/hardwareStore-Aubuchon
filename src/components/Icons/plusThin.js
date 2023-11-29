import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const PlusThin = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M9 0H7V7H0V9H7V16H9V9H16V7H9V0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

PlusThin.propTypes = {
    color: PropTypes.string
};

PlusThin.displayName = 'PlusThin';

export default PlusThin;
