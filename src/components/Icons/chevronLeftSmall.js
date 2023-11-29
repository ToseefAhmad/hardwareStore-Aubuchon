import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ChevronLeftSmall = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="8"
                viewBox="0 0 5 8"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.70711 7.70711C4.31658 8.09763 3.68342 8.09763 3.29289 7.70711L0.292893 4.70711C-0.0976311 4.31658 -0.0976311 3.68342 0.292893 3.29289L3.29289 0.292893C3.68342 -0.0976316 4.31658 -0.0976315 4.70711 0.292893C5.09763 0.683417 5.09763 1.31658 4.70711 1.70711L2.41421 4L4.70711 6.29289C5.09763 6.68342 5.09763 7.31658 4.70711 7.70711Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

ChevronLeftSmall.propTypes = {
    color: PropTypes.string
};

ChevronLeftSmall.displayName = 'ChevronLeftSmall';

export default ChevronLeftSmall;
