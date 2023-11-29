import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const MenuBold = forwardRef(
    ({ color = 'currentColor', isHover = false, ...rest }, ref) => {
        const path = isHover
            ? 'M 0 1 C 0 0.4477 0.4477 0 1 0 H 15 C 15.5523 0 16 0.4477 16 1 C 16 1.5523 15.5523 2 15 2 H 1 C 0.4477 2 0 1.5523 0 1 Z M 0 15 C 0 14.4477 0.4477 14 1 14 H 15 C 15.5523 14 16 14.4477 16 15 C 16 15.5523 15.5523 16 15 16 H 1 C 0.4477 16 0 15.5523 0 15 Z M 1 7 C 0.4477 7 0 7.4477 0 8 C 0 8.5523 0.4477 9 1 9 H 15 C 15.5523 9 16 8.5523 16 8 C 16 7.4477 15.5523 7 15 7 H 1 Z'
            : 'M0 1C0 0.447716 0.447716 0 1 0H15C15.5523 0 16 0.447716 16 1C16 1.55228 15.5523 2 15 2H1C0.447716 2 0 1.55228 0 1ZM0 15C0 14.4477 0.447716 14 1 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H1C0.447716 16 0 15.5523 0 15ZM1 7C0.447716 7 0 7.44772 0 8C0 8.55228 0.447716 9 1 9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H1Z';
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
                    d={path}
                    fill={color}
                    style={{
                        transition: 'all .3s'
                    }}
                    {...rest}
                />
            </svg>
        );
    }
);

MenuBold.propTypes = {
    color: PropTypes.string,
    isHover: PropTypes.bool
};

MenuBold.displayName = 'MenuBold';

export default MenuBold;
