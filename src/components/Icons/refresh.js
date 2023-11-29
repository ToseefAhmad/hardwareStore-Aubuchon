import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

const Refresh = forwardRef(({ color = 'currentColor', ...rest }, ref) => {
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.70709 1.70718C9.09763 1.31656 9.09763 0.683502 8.70709 0.292877C8.31659 -0.0976257 7.68341 -0.0976257 7.29291 0.292877L5.29291 2.29288C4.90237 2.6835 4.90237 3.31656 5.29291 3.70718L7.29291 5.70718C7.68341 6.09769 8.31659 6.09769 8.70709 5.70718C9.09448 5.31973 9.0976 4.69363 8.71652 4.3024C10.6324 5.00272 12 6.84158 12 9.00003C12 11.7615 9.76141 14 7 14C4.23859 14 2 11.7615 2 9.00003C2 7.97855 2.3063 7.02859 2.83209 6.23709C3.13766 5.77701 3.14786 5.14798 2.75735 4.75735C2.36682 4.36685 1.72693 4.36331 1.39566 4.80521C0.519226 5.97415 0 7.42654 0 9.00003C0 12.866 3.134 16 7 16C10.866 16 14 12.866 14 9.00003C14 5.57645 11.5422 2.72684 8.29471 2.11954L8.70709 1.70718Z"
                fill={color}
                {...rest}
            />
        </svg>
    );
});

Refresh.propTypes = {
    color: PropTypes.string
};

Refresh.displayName = 'Refresh';

export default Refresh;
