import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Minus = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="2"
            viewBox="0 0 8 2"
            fill="none"
        >
            <rect width="8" height="2" fill={color} {...rest} />
        </svg>
    );
});

Minus.propTypes = {
    color: PropTypes.string
};

Minus.displayName = 'Minus';

export default Minus;
