import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Discount = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="50"
            viewBox="0 0 38 50"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 1.99924H36V46.1565L31.9662 41.1521C30.4656 39.2903 27.6766 39.1524 25.9995 40.8571L19 47.9719L12.0005 40.8571C10.3234 39.1524 7.53444 39.2903 6.03377 41.1521L2 46.1565V1.99924ZM30.4089 42.4064L36.2567 49.6615C36.8698 50.3539 38 49.9131 38 48.9815V1.99924C38 0.895092 37.1046 0 36 0H2C0.895431 0 0 0.895091 0 1.99924V48.9815C0 49.9131 1.1302 50.3539 1.7433 49.6615L7.59114 42.4064C8.34148 41.4755 9.73594 41.4066 10.5745 42.259L17.5858 49.3857C18.3668 50.1796 19.6332 50.1796 20.4142 49.3857L27.4255 42.259C28.2641 41.4066 29.6585 41.4755 30.4089 42.4064ZM30 28C30 30.7615 27.7614 33 25 33C22.2386 33 20 30.7615 20 28C20 25.2385 22.2386 23 25 23C27.7614 23 30 25.2385 30 28ZM28 28C28 29.6567 26.6569 31 25 31C23.3431 31 22 29.6567 22 28C22 26.3433 23.3431 25 25 25C26.6569 25 28 26.3433 28 28ZM13 21C15.7614 21 18 18.7614 18 16C18 13.2386 15.7614 11 13 11C10.2386 11 8 13.2386 8 16C8 18.7614 10.2386 21 13 21ZM13 19C14.6569 19 16 17.6569 16 16C16 14.3431 14.6569 13 13 13C11.3431 13 10 14.3431 10 16C10 17.6569 11.3431 19 13 19ZM28.7071 13.7071C29.0976 13.3166 29.0976 12.6834 28.7071 12.2929C28.3166 11.9024 27.6834 11.9024 27.2929 12.2929L10.2929 29.2929C9.90237 29.6834 9.90237 30.3166 10.2929 30.7071C10.6834 31.0976 11.3166 31.0976 11.7071 30.7071L28.7071 13.7071Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Discount.propTypes = {
    color: PropTypes.string
};

Discount.displayName = 'Discount';

export default Discount;