import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Target = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C7.44771 0 7 0.447693 7 1V2.08295C4.4875 2.50446 2.50449 4.48749 2.08296 7H1C0.447708 7 0 7.44769 0 8C0 8.55231 0.447708 9 1 9H2.08296C2.50449 11.5125 4.4875 13.4955 7 13.9171V15C7 15.5523 7.44771 16 8 16C8.55229 16 9 15.5523 9 15V13.9171C11.5125 13.4955 13.4955 11.5125 13.917 9H15C15.5523 9 16 8.55231 16 8C16 7.44769 15.5523 7 15 7H13.917C13.4955 4.48749 11.5125 2.50446 9 2.08295V1C9 0.447693 8.55229 0 8 0ZM8 12C10.2091 12 12 10.2092 12 8C12 5.79083 10.2091 4 8 4C5.79086 4 4 5.79083 4 8C4 10.2092 5.79086 12 8 12ZM8 9C8.55229 9 9 8.55231 9 8C9 7.44769 8.55229 7 8 7C7.44771 7 7 7.44769 7 8C7 8.55231 7.44771 9 8 9Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Target.propTypes = {
    color: PropTypes.string
};

Target.displayName = 'Target';

export default Target;
