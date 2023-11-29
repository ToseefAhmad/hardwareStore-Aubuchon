import React, { useMemo, useCallback } from 'react';

import classes from './loader.module.css';

const DOTS_COUNT = 3;

const Loader = () => {
    // Creates one animated dot
    const dot = useCallback(
        delay => (
            <div
                className={classes.dot}
                style={{ animationDelay: `${delay}ms` }}
            />
        ),
        []
    );

    // Creates an array of animated dots, each dot having a different animation delay so the dots appear one-by-one
    const dots = useMemo(
        () =>
            Array.from(Array(DOTS_COUNT)).map((_, idx) => {
                const delay = idx * 200;
                return dot(delay);
            }),
        [dot]
    );

    return (
        <div className={classes.root}>
            <p className={classes.text}>Finding Results</p>
            <div className={classes.dots}>{dots}</div>
        </div>
    );
};

export default Loader;
