import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Info = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 -6.99382e-07C3.58173 -1.08564e-06 1.08564e-06 3.58172 6.99382e-07 8C3.13124e-07 12.4183 3.58173 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 -3.13124e-07 8 -6.99382e-07ZM8 2C4.68628 2 2 4.68628 2 8C2 11.3137 4.68628 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68628 11.3137 2 8 2ZM7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11ZM8 9C8.55228 9 9 8.55231 9 8L9 5C9 4.44769 8.55228 4 8 4C7.44772 4 7 4.44769 7 5L7 8C7 8.55231 7.44772 9 8 9Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Info.propTypes = {
    color: PropTypes.string
};

Info.displayName = 'Info';

export default Info;
