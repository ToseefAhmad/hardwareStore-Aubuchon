import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Star = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 24 22"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C12.5186 1 12.9931 1.28297 13.2271 1.73179L15.8779 6.81643L21.8192 7.63868C22.341 7.71089 22.7743 8.06597 22.9347 8.55282C23.0951 9.03966 22.9545 9.57259 22.5725 9.92481L18.2943 13.8703L19.3025 19.436C19.3928 19.9345 19.1842 20.4397 18.764 20.74C18.3438 21.0403 17.7845 21.084 17.3201 20.8528L12 18.2037L6.67985 20.8528C6.2155 21.084 5.65618 21.0403 5.23599 20.74C4.8158 20.4397 4.6072 19.9345 4.69751 19.436L5.70571 13.8703L1.42747 9.92481C1.04555 9.57259 0.904859 9.03966 1.06528 8.55282C1.2257 8.06597 1.65899 7.71089 2.18077 7.63868L8.12212 6.81643L10.7729 1.73179C11.0069 1.28297 11.4814 1 12 1Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={color}
                {...rest}
            />
        </svg>
    );
});

Star.propTypes = {
    color: PropTypes.string
};

Star.displayName = 'Star';

export default Star;
