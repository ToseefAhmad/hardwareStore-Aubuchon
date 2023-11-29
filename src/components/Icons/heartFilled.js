import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const HeartFilled = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.52791 0.349562C10.095 0.118642 10.7023 0 11.3151 0C11.928 0 12.5352 0.118642 13.1023 0.349562C13.6693 0.580434 14.1856 0.919247 14.6212 1.34748M14.6212 1.34748C15.057 1.77564 15.404 2.28524 15.6409 2.84701C15.8778 3.40896 16 4.01191 16 4.62124C16 5.23058 15.8778 5.83353 15.6409 6.39548C15.404 6.95732 15.0573 7.46665 14.6214 7.89484L8.70074 13.7132C8.31168 14.0956 7.68797 14.0956 7.2989 13.7132L1.37825 7.89484C0.497856 7.02965 0 5.85246 0 4.62124C0 3.39003 0.497856 2.21284 1.37825 1.34765C2.25806 0.483039 3.44768 0.000352859 4.68453 0.000352859C5.92137 0.000352859 7.111 0.483039 7.9908 1.34765L7.99982 1.35651L8.00867 1.34781C8.44436 0.919497 8.96086 0.580464 9.52791 0.349562"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

HeartFilled.propTypes = {
    color: PropTypes.string
};

HeartFilled.displayName = 'HeartFilled';

export default HeartFilled;
