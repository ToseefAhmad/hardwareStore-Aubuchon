import { func } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import LinkButton from '@app/components/LinkButton';

import classes from './callToActionBlock.module.css';

const CallToActionBlock = ({ onLinkBtnClick, onBtnClick }) => {
    return (
        <div className={classes.root}>
            <Button
                onPress={onBtnClick}
                priority="high"
                classes={classes.regBtn}
            >
                Register
            </Button>
            <p className={classes.sigInText}>
                or, <LinkButton onPress={onLinkBtnClick}>sign in</LinkButton> to
                view your account
            </p>
        </div>
    );
};

CallToActionBlock.propTypes = {
    onLinkBtnClick: func.isRequired,
    onBtnClick: func.isRequired
};

export default CallToActionBlock;
