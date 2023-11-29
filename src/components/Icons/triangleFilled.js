import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const TriangleFilled = forwardRef(
    ({ color = 'currentColor', ...rest }, ref) => {
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.16128 0.415287C6.57423 -0.138428 7.42577 -0.138429 7.83872 0.415286L13.8023 8.41167C14.2964 9.0742 13.8075 10 12.9636 10H1.03641C0.192453 10 -0.296422 9.0742 0.197681 8.41167L6.16128 0.415287Z"
                    fill={color}
                    {...rest}
                />
            </svg>
        );
    }
);

TriangleFilled.propTypes = {
    color: PropTypes.string
};

TriangleFilled.displayName = 'TriangleFilled';

export default TriangleFilled;
