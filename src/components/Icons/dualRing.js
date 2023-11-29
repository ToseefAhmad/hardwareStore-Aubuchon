import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const DualRing = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0711 15.071C18.8807 13.2614 20 10.7614 20 8C20 5.23859 18.8807 2.73859 17.0711 0.928955L15.6569 2.34314C17.1046 3.79083 18 5.79089 18 8C18 10.2091 17.1046 12.2092 15.6568 13.6569L17.0711 15.071ZM2.92894 15.071C1.11929 13.2614 0 10.7614 0 8C0 5.23859 1.11929 2.73859 2.92894 0.928955L4.34314 2.34314C2.89542 3.79083 2 5.79089 2 8C2 10.2091 2.89542 12.2092 4.34314 13.6569L2.92894 15.071Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

DualRing.propTypes = {
    color: PropTypes.string
};

DualRing.displayName = 'DualRing';

export default DualRing;
