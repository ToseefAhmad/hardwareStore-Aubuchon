import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const ArrowRight = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M12.7072 0.292923C12.3165 -0.097641 11.6835 -0.097641 11.2928 0.292923C10.9023 0.683426 10.9023 1.3166 11.2928 1.70711L12.5858 3.00002H1C0.447754 3.00002 0 3.44771 0 4.00002C0 4.55232 0.447754 5.00002 1 5.00002H12.5858L11.2928 6.29292C10.9023 6.68343 10.9023 7.3166 11.2928 7.70711C11.6835 8.09767 12.3165 8.09767 12.7072 7.70711L15.7072 4.70711C16.0977 4.3166 16.0977 3.68343 15.7072 3.29292L12.7072 0.292923Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

ArrowRight.propTypes = {
    color: PropTypes.string
};

ArrowRight.displayName = 'ArrowRight';

export default ArrowRight;
