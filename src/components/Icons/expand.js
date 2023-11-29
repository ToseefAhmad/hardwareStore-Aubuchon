import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Expand = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M4.70711 0.292893C4.31658 -0.0976311 3.68342 -0.0976311 3.29289 0.292893L0.292893 3.29289C-0.0976311 3.68342 -0.0976311 4.31658 0.292893 4.70711C0.683417 5.09763 1.31658 5.09763 1.70711 4.70711L4 2.41421L6.29289 4.70711C6.68342 5.09763 7.31658 5.09763 7.70711 4.70711C8.09763 4.31658 8.09763 3.68342 7.70711 3.29289L4.70711 0.292893ZM0.292894 10.7071L3.29289 13.7071C3.68342 14.0976 4.31658 14.0976 4.70711 13.7071L7.70711 10.7071C8.09763 10.3166 8.09763 9.68342 7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289L4 11.5858L1.70711 9.29289C1.31658 8.90237 0.683418 8.90237 0.292894 9.29289C-0.0976306 9.68342 -0.0976307 10.3166 0.292894 10.7071Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Expand.propTypes = {
    color: PropTypes.string
};

Expand.displayName = 'Expand';

export default Expand;
