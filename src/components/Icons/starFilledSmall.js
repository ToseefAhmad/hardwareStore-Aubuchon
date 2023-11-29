import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const StarFilledSmall = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00003 0C8.37721 0 8.72231 0.212227 8.89247 0.548841L10.8203 4.36233L15.1413 4.97901C15.5208 5.03317 15.8359 5.29948 15.9526 5.66462C16.0693 6.02975 15.9669 6.42945 15.6892 6.69361L12.5777 9.65269L13.311 13.827C13.3766 14.2009 13.2249 14.5798 12.9193 14.805C12.6137 15.0302 12.207 15.063 11.8692 14.8896L8.00003 12.9028L4.13082 14.8896C3.79311 15.063 3.38633 15.0302 3.08073 14.805C2.77514 14.5798 2.62343 14.2009 2.68911 13.827L3.42234 9.65269L0.31089 6.69361C0.0331253 6.42945 -0.0691937 6.02975 0.0474756 5.66462C0.164145 5.29948 0.479269 5.03317 0.858745 4.97901L5.17974 4.36233L7.10759 0.548841C7.27776 0.212227 7.62285 0 8.00003 0Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

StarFilledSmall.propTypes = {
    color: PropTypes.string
};

StarFilledSmall.displayName = 'StarFilledSmall';

export default StarFilledSmall;
