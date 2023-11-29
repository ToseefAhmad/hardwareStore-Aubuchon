import { func, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';

import classes from './successMessageContent.module.css';

const SuccessMessageContent = ({ message, handleClose }) => {
    return (
        <>
            <button className={classes.closeButton} onClick={handleClose}>
                <Icon src={CloseIcon} />
            </button>
            <div className={classes.root}>
                <p className={classes.message}>{message}</p>
            </div>
        </>
    );
};

SuccessMessageContent.propTypes = {
    handleClose: func.isRequired,
    message: string.isRequired
};

export default SuccessMessageContent;
