import { string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { BigCheckmark } from '@app/components/Icons';

import classes from './submitAnimation.module.css';
import { useSubmitAnimation } from './useSubmitAnimation';

const SubmitAnimation = props => {
    const { title, subtitle } = props;

    const { boxRef, contentRef, iconRef, isOpen } = useSubmitAnimation();

    return (
        <>
            {isOpen && (
                <div className={classes.root} ref={boxRef}>
                    <div className={classes.content} ref={contentRef}>
                        <div className={classes.iconContainer}>
                            <div className={classes.icon} ref={iconRef}>
                                <Icon
                                    src={BigCheckmark}
                                    classes={{
                                        root: classes.iconRoot
                                    }}
                                />
                            </div>
                        </div>
                        <p className={classes.text}>
                            {title}
                            <span className={classes.strong}>{subtitle}</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

SubmitAnimation.propTypes = {
    title: string,
    subtitle: string
};

export default SubmitAnimation;
