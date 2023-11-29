import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Calendar = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C6 0.895508 6.89542 0 8 0H12C13.1046 0 14 0.895508 14 2V5H28V2C28 0.895508 28.8954 0 30 0H34C35.1046 0 36 0.895508 36 2V5H40C41.1046 5 42 5.89551 42 7V21.7302C46.7578 24.2451 50 29.2439 50 35C50 43.2842 43.2843 50 35 50C30.5565 50 26.5643 48.0679 23.8176 44.9978C23.8182 44.9985 23.8189 44.9993 23.8195 45H2C0.895416 45 0 44.1045 0 43V7C0 5.89551 0.895416 5 2 5H6V2ZM6 7H2V14H40V7H36V10C36 11.1045 35.1046 12 34 12H30C28.8954 12 28 11.1045 28 10V7H14V10C14 11.1045 13.1046 12 12 12H8C6.89542 12 6 11.1045 6 10V7ZM40 16H2V43H22.3091C22.3271 43.0283 22.345 43.0564 22.3631 43.0847C20.8673 40.7517 20 37.9771 20 35C20 26.7158 26.7157 20 35 20C36.7535 20 38.4359 20.3005 40 20.8535V16ZM8 2H12V10H8V2ZM35 48C42.1797 48 48 42.1797 48 35C48 27.8203 42.1797 22 35 22C27.8203 22 22 27.8203 22 35C22 42.1797 27.8203 48 35 48ZM35 24C34.4477 24 34 24.4478 34 25V35C34 35.5522 34.4477 36 35 36H43C43.5523 36 44 35.5522 44 35C44 34.4478 43.5523 34 43 34H36V25C36 24.4478 35.5523 24 35 24ZM34 2H30V10H34V2Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Calendar.propTypes = {
    color: PropTypes.string
};

Calendar.displayName = 'Calendar';

export default Calendar;
