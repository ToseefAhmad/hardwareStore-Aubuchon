import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const VideoCamera = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.07874 2.42857C2.07874 2.27434 2.13654 2.15526 2.20288 2.08362C2.26753 2.0138 2.3256 2 2.3622 2H9.6378C9.6744 2 9.73247 2.0138 9.79713 2.08362C9.86346 2.15526 9.92126 2.27434 9.92126 2.42857V9.57143C9.92126 9.72566 9.86346 9.84474 9.79713 9.91638C9.73247 9.9862 9.6744 10 9.6378 10H2.3622C2.3256 10 2.26753 9.9862 2.20288 9.91638C2.13654 9.84474 2.07874 9.72566 2.07874 9.57143V2.42857ZM2.3622 0C0.947968 0 0 1.19904 0 2.42857V9.57143C0 10.801 0.947968 12 2.3622 12H9.6378C11.052 12 12 10.801 12 9.57143V8.41165L14.4889 10.7596C14.7679 11.0227 15.1503 11.0743 15.4727 10.8923C15.795 10.7103 16 10.3269 16 9.90624V2.09376C16 1.67311 15.795 1.28973 15.4727 1.10771C15.1503 0.925687 14.7679 0.977284 14.4889 1.24041L12 3.58835V2.42857C12 1.19904 11.052 0 9.6378 0H2.3622ZM14.1408 7.62745L12.4156 6L14.1408 4.37255V7.62745Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

VideoCamera.propTypes = {
    color: PropTypes.string
};

VideoCamera.displayName = 'VideoCamera';

export default VideoCamera;
