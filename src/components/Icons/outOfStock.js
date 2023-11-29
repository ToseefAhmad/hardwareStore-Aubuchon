import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const OutOfStock = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C12 9.76142 9.76142 12 7 12C5.98092 12 5.03304 11.6951 4.24261 11.1716L11.1716 4.24261C11.6951 5.03304 12 5.98092 12 7ZM2.8284 9.75739L9.75739 2.8284C8.96696 2.30488 8.01908 2 7 2C4.23858 2 2 4.23858 2 7C2 8.01908 2.30488 8.96696 2.8284 9.75739ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

OutOfStock.defaultProps = {
    color: '#F41010'
};

OutOfStock.propTypes = {
    color: PropTypes.string
};

OutOfStock.displayName = 'OutOfStock';

export default OutOfStock;
