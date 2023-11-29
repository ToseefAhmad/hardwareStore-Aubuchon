import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ChevronRight = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292893 9.70711C-0.0976309 9.31658 -0.0976309 8.68342 0.292894 8.29289L3.58579 5L0.292894 1.70711C-0.0976302 1.31658 -0.0976302 0.683417 0.292894 0.292893C0.683418 -0.0976319 1.31658 -0.0976319 1.70711 0.292893L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

ChevronRight.propTypes = {
    color: PropTypes.string
};

ChevronRight.displayName = 'ChevronRight';

export default ChevronRight;
