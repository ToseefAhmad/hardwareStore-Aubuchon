import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const InfoFilled = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM7 6C6.44772 6 6 6.44772 6 7V10C6 10.5523 6.44772 11 7 11C7.55228 11 8 10.5523 8 10V7C8 6.44772 7.55228 6 7 6Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

InfoFilled.propTypes = {
    color: PropTypes.string
};

InfoFilled.displayName = 'InfoFilled';

export default InfoFilled;
