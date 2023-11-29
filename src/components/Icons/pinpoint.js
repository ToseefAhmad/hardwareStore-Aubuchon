import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Pinpoint = forwardRef((props, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
        >
            <rect x="10" y="21" width="2" height="13" fill="#1D201F" />
            <circle cx="11" cy="11" r="11" fill="#12724C" />
            <circle cx="11" cy="11" r="3" fill="white" />
        </svg>
    );
});

Pinpoint.propTypes = {
    color: PropTypes.string
};

Pinpoint.displayName = 'Pinpoint';

export default Pinpoint;
