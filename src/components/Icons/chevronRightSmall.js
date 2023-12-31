import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ChevronRightSmall = forwardRef(
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
                    d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L4.70711 3.29289C5.09763 3.68342 5.09763 4.31658 4.70711 4.70711L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L2.58579 4L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

ChevronRightSmall.propTypes = {
    color: PropTypes.string
};

ChevronRightSmall.displayName = 'ChevronRightSmall';

export default ChevronRightSmall;
