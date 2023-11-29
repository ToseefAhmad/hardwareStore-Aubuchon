import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Chair = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39 0C38.634 0 38.2974 0.199951 38.1221 0.52124L29.6791 16H5.99999C5.44769 16 4.99999 16.4478 4.99999 17C4.99999 17.5522 5.44769 18 5.99999 18H8.99999V23V24V31C8.99999 31.5522 9.44769 32 9.99999 32H17.382L12.5414 41.6812C10.0537 41.0471 7.65215 40.2117 5.35711 39.1941C4.54894 38.8359 3.58752 38.9785 2.95745 39.5803L0.601373 41.8303C-0.362739 42.751 -0.141791 44.2966 1.07897 44.8765C7.98284 48.1558 15.7659 50 24 50C32.2341 50 40.0171 48.1558 46.921 44.8765C48.1418 44.2966 48.3627 42.751 47.3986 41.8303L45.0425 39.5803C44.4125 38.9785 43.451 38.8359 42.6429 39.1941C39.5276 40.5754 36.2162 41.6211 32.7595 42.283L27.618 32H33C33.3693 32 33.7085 31.7964 33.8823 31.4707L49.8823 1.4707C50.0477 1.16064 50.0382 0.786621 49.8575 0.485596C49.6768 0.184326 49.3512 0 49 0H39ZM11 24V30H32.4L47.3333 2H39.5936L27.8779 23.4788C27.7026 23.8 27.366 24 27 24H11ZM11 22H26.4064L28.5882 18H11V22ZM25.382 32H19.618L14.5459 42.1443C17.5922 42.7764 20.7554 43.1094 24 43.1094C26.2764 43.1094 28.5127 42.9456 30.6966 42.6294L25.382 32ZM24 48C31.8635 48 39.2918 46.2546 45.8875 43.1528L43.6612 41.0266C43.6595 41.0249 43.6427 41.0098 43.5986 41.0029C43.5528 40.9956 43.5003 41.0017 43.4535 41.0225C37.5342 43.647 30.942 45.1094 24 45.1094C17.058 45.1094 10.4658 43.647 4.54644 41.0225C4.52953 41.0149 4.51183 41.0093 4.49401 41.0056C4.4779 41.0022 4.4616 41.0002 4.44567 41C4.43054 40.9998 4.41564 41.0007 4.40142 41.0029C4.39275 41.0042 4.38513 41.0059 4.37853 41.0078C4.36779 41.0107 4.35955 41.0142 4.35345 41.0171C4.34405 41.0217 4.33959 41.0259 4.33874 41.0266L2.11248 43.1528C8.70818 46.2546 16.1365 48 24 48Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Chair.propTypes = {
    color: PropTypes.string
};

Chair.displayName = 'Chair';

export default Chair;