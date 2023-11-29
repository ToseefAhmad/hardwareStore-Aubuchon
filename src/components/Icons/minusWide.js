import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const MinusWide = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="2"
            viewBox="0 0 16 2"
            fill="none"
        >
            <rect width="16" height="2" fill={color} {...rest} />
        </svg>
    );
});

MinusWide.propTypes = {
    color: PropTypes.string
};

MinusWide.displayName = 'MinusWide';

export default MinusWide;
