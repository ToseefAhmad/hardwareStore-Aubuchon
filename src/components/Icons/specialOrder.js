import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const SpecialOrder = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12ZM8 4C8 4.55228 7.55229 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55229 3 8 3.44772 8 4ZM7 6C6.44772 6 6 6.44772 6 7V10C6 10.5523 6.44772 11 7 11C7.55229 11 8 10.5523 8 10V7C8 6.44772 7.55229 6 7 6Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

SpecialOrder.defaultProps = {
    color: '#E5C44D'
};

SpecialOrder.propTypes = {
    color: PropTypes.string
};

SpecialOrder.displayName = 'SpecialOrder';

export default SpecialOrder;
