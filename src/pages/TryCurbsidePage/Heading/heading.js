import React from 'react';

import classes from './heading.module.css';
import { useHeading } from './useHeading';

const Heading = () => {
    const { typewriterRef, typewriterContainerRef } = useHeading();

    return (
        <div className={classes.root} ref={typewriterContainerRef}>
            <p className={classes.typewrite}>
                <span ref={typewriterRef} />
            </p>
        </div>
    );
};

export default Heading;
