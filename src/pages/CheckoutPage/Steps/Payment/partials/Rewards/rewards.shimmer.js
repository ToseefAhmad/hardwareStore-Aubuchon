import React from 'react';

import { CardShimmer } from './Card';
import classes from './rewards.module.css';

const RewardsShimmer = () => {
    return (
        <div className={classes.root}>
            <div className={classes.cards}>
                {Array.from(Array(2).keys(), index => {
                    return <CardShimmer key={index} />;
                })}
            </div>
        </div>
    );
};

export default RewardsShimmer;
