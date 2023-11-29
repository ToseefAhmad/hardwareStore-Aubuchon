import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ChevronUpSmall = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.70711 4.70711C7.31658 5.09763 6.68342 5.09763 6.29289 4.70711L4 2.41421L1.70711 4.70711C1.31658 5.09763 0.683417 5.09763 0.292893 4.70711C-0.0976314 4.31658 -0.0976313 3.68342 0.292894 3.29289L3.29289 0.292893C3.68342 -0.0976318 4.31658 -0.0976318 4.70711 0.292893L7.70711 3.29289C8.09763 3.68342 8.09763 4.31658 7.70711 4.70711Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

ChevronUpSmall.propTypes = {
    color: PropTypes.string
};

ChevronUpSmall.displayName = 'ChevronUpSmall';

export default ChevronUpSmall;
