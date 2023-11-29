import { number } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './circleProgressBar.module.css';
import { useCircleProgressBar } from './useCircleProgressBar';

const CircleProgressBar = props => {
    const { size, pointTotal } = props;

    const {
        strokeWidth,
        cx,
        cy,
        radius,
        circumference,
        dash,
        pointsLeft
    } = useCircleProgressBar({ size, pointTotal });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                className={classes.bgCircle}
                cx={cx}
                cy={cy}
                r={radius}
                strokeWidth={`${strokeWidth / 4}px`}
                fill="none"
            />
            <circle
                className={classes.progressCircle}
                cx={cx}
                cy={cy}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeDasharray={[dash, circumference - dash]}
                strokeLinecap="round"
                fill="none"
            />
            <foreignObject width={size} height={size}>
                <div className={classes.content}>
                    <p className={classes.points}>{pointsLeft}</p>
                    <p className={classes.paragraph}>
                        <FormattedMessage
                            id="rewardsPage.progressCircleDescription"
                            defaultMessage="points to your next reward"
                        />
                    </p>
                </div>
            </foreignObject>
        </svg>
    );
};

CircleProgressBar.propTypes = {
    size: number,
    pointTotal: number
};

CircleProgressBar.defaultProps = {
    size: 140,
    pointTotal: 0
};

export default CircleProgressBar;
