import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const BigCheckmark = forwardRef(({ ...rest }, ref) => {
    return (
        <svg
            width="58"
            height="43"
            viewBox="0 0 58 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
        >
            <path
                id="test"
                d="M2 26L17 41L56 2"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...rest}
            />
        </svg>
    );
});

BigCheckmark.propTypes = {
    color: PropTypes.string
};

BigCheckmark.displayName = 'BigCheckmark';

export default BigCheckmark;
