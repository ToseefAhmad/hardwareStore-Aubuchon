import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Mail = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
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
                d="M13.993 14H2.007C1.47608 13.9995 0.966957 13.7888 0.590886 13.4141C0.214815 13.0393 0.00237817 12.5309 0 12V2.00002C-2.10649e-06 1.7367 0.0519933 1.47597 0.153003 1.2328C0.254012 0.989623 0.402047 0.768789 0.588612 0.582966C0.775177 0.397144 0.996601 0.249992 1.24018 0.149955C1.48375 0.049917 1.74468 -0.00103727 2.008 1.60015e-05H13.993C14.5239 0.000539215 15.033 0.211199 15.4091 0.585958C15.7852 0.960717 15.9976 1.4691 16 2.00002V12C16 12.2633 15.948 12.5241 15.847 12.7672C15.746 13.0104 15.598 13.2312 15.4114 13.4171C15.2248 13.6029 15.0034 13.75 14.7598 13.8501C14.5162 13.9501 14.2553 14.0011 13.992 14H13.993ZM14 12V3.47002L9.055 8.56002C8.91568 8.69956 8.75022 8.81026 8.56807 8.88579C8.38593 8.96132 8.19068 9.0002 7.9935 9.0002C7.79632 9.0002 7.60107 8.96132 7.41893 8.88579C7.23678 8.81026 7.07132 8.69956 6.932 8.56002L2 3.48402V12H14ZM12.63 2.00002H3.36L7.994 6.78002L12.63 2.00002Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Mail.propTypes = {
    color: PropTypes.string
};

Mail.displayName = 'Mail';

export default Mail;
