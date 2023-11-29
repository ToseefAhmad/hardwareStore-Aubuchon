import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Menu = forwardRef(
    ({ color = 'currentColor', isHover = false, ...rest }, ref) => {
        const path = isHover
            ? 'M 0 1 C 0 0.4477 0.4477 0 1 0 H 19 C 19.5523 0 20 0.4477 20 1 C 20 1.5523 19.5523 2 19 2 H 1 C 0.4477 2 0 1.5523 0 1 Z M 0 19 C 0 18.4477 0.4477 18 1 18 H 19 C 19.5523 18 20 18.4477 20 19 C 20 19.5523 19.5523 20 19 20 H 1 C 0.4477 20 0 19.5523 0 19 Z M 1 9 C 0.4477 9 0 9.4477 0 10 C 0 10.5523 0.4477 11 1 11 H 19 C 19.5523 11 20 10.5523 20 10 C 20 9.4477 19.5523 9 19 9 H 1 Z'
            : 'M0 1C0 0.447716 0.447716 0 1 0H19C19.5523 0 20 0.447716 20 1C20 1.55228 19.5523 2 19 2H1C0.447716 2 0 1.55228 0 1ZM0 19C0 18.4477 0.447716 18 1 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H1C0.447716 20 0 19.5523 0 19ZM1 9C0.447716 9 0 9.44772 0 10C0 10.5523 0.447716 11 1 11H17C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9H1Z';
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
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

Menu.propTypes = {
    color: PropTypes.string,
    isHover: PropTypes.bool
};

Menu.displayName = 'Menu';

export default Menu;
