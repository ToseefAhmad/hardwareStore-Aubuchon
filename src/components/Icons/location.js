import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Location = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.54545C12 8.23547 10.7782 10.0972 9.09506 11.7584C8.34661 12.4971 7.59119 13.1135 7 13.5591C6.40881 13.1135 5.65339 12.4971 4.90494 11.7584C3.22184 10.0972 2 8.23547 2 6.54545C2 5.38491 2.49181 4.24237 3.41624 3.37797C4.34521 2.50932 5.63221 2 7 2C8.36779 2 9.65479 2.50932 10.5838 3.37797C11.5082 4.24237 12 5.38491 12 6.54545ZM14 6.54545C14 11.6364 7 16 7 16C7 16 0 11.6364 0 6.54545C0 4.80949 0.737498 3.14463 2.05025 1.91712C3.36301 0.689608 5.14348 0 7 0C8.85652 0 10.637 0.689608 11.9497 1.91712C13.2625 3.14463 14 4.80949 14 6.54545ZM8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Location.propTypes = {
    color: PropTypes.string
};

Location.displayName = 'Location';

export default Location;
