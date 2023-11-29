import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ArrowLeft = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C16 3.44772 15.5523 3 15 3L3.41421 3L4.70709 1.70711C5.09763 1.31658 5.09763 0.68342 4.70709 0.292894C4.31659 -0.097632 3.68341 -0.097632 3.29291 0.292894L0.292908 3.29289C-0.0976259 3.68342 -0.0976259 4.31658 0.292908 4.70711L3.29291 7.70711C3.68341 8.09763 4.31659 8.09763 4.70709 7.70711C5.09763 7.31658 5.09763 6.68342 4.70709 6.29289L3.41421 5L15 5C15.5523 5 16 4.55229 16 4Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

ArrowLeft.propTypes = {
    color: PropTypes.string
};

ArrowLeft.displayName = 'ArrowLeft';

export default ArrowLeft;
