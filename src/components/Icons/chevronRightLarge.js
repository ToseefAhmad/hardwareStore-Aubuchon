import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ChevronRightLarge = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.292893 13.7071C-0.0976314 13.3166 -0.0976313 12.6834 0.292894 12.2929L5.58579 7L0.292894 1.70711C-0.0976303 1.31658 -0.0976303 0.683417 0.292895 0.292893C0.683419 -0.0976321 1.31658 -0.097632 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

ChevronRightLarge.propTypes = {
    color: PropTypes.string
};

ChevronRightLarge.displayName = 'ChevronRightLarge';

export default ChevronRightLarge;
