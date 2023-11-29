import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ArrowDown = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0C3.44772 0 3 0.447723 3 1V8.58578L1.70711 7.29291C1.31658 6.90237 0.68342 6.90237 0.292894 7.29291C-0.0976315 7.68341 -0.0976315 8.31659 0.292894 8.70709L3.29289 11.7071C3.68342 12.0976 4.31658 12.0976 4.70711 11.7071L7.70711 8.70709C8.09764 8.31659 8.09764 7.68341 7.70711 7.29291C7.31658 6.90237 6.68342 6.90237 6.29289 7.29291L5 8.58578V1C5 0.447723 4.55229 0 4 0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

ArrowDown.propTypes = {
    color: PropTypes.string
};

ArrowDown.displayName = 'ArrowDown';

export default ArrowDown;
