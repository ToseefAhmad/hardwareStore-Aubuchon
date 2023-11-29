import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Minimize = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
        >
            <rect width="12" height="2" fill={color} {...rest} />
        </svg>
    );
});

Minimize.propTypes = {
    color: PropTypes.string
};

Minimize.displayName = 'Minimize';

export default Minimize;
