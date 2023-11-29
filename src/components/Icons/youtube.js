import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Youtube = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
        >
            <path
                d="M8.00391 11C6.05691 11 3.55597 10.97 2.54297 10.913C1.61497 10.849 1.12871 10.7321 0.678711 9.93506C0.228711 9.13806 0 7.73496 0 5.50696V5.49695C0 3.23695 0.208711 1.86904 0.678711 1.06104C1.11271 0.294035 1.58392 0.147041 2.54492 0.092041C3.56592 0.024041 6.12391 0 8.00391 0C9.88391 0 12.435 0.024041 13.458 0.092041C14.419 0.147041 14.8913 0.292035 15.3203 1.06104C15.7913 1.86104 16.001 3.22802 16.001 5.49902V5.50598C16.001 7.77798 15.7923 9.14501 15.3223 9.93701C14.8923 10.699 14.422 10.849 13.458 10.913C12.448 10.969 9.94991 11 8.00391 11ZM6.00391 2.5V8.5L11.0039 5.5L6.00391 2.5Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Youtube.propTypes = {
    color: PropTypes.string
};

Youtube.displayName = 'Youtube';

export default Youtube;
