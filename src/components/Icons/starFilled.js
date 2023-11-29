import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const StarFilled = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 0C11.5186 0 11.9931 0.28297 12.2271 0.731787L14.8779 5.81643L20.8192 6.63868C21.341 6.71089 21.7743 7.06597 21.9347 7.55282C22.0951 8.03966 21.9545 8.57259 21.5725 8.92481L17.2943 12.8703L18.3025 18.436C18.3928 18.9345 18.1842 19.4397 17.764 19.74C17.3438 20.0403 16.7845 20.084 16.3201 19.8528L11 17.2037L5.67985 19.8528C5.2155 20.084 4.65618 20.0403 4.23599 19.74C3.8158 19.4397 3.60721 18.9345 3.69751 18.436L4.70571 12.8703L0.427472 8.92481C0.0455471 8.57259 -0.0951409 8.03966 0.0652786 7.55282C0.225698 7.06597 0.658993 6.71089 1.18077 6.63868L7.12212 5.81643L9.77289 0.731787C10.0069 0.28297 10.4814 0 11 0Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

StarFilled.propTypes = {
    color: PropTypes.string
};

StarFilled.displayName = 'StarFilled';

export default StarFilled;
