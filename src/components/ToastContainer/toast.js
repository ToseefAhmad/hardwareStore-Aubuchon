import { oneOf, string } from 'prop-types';
import React from 'react';

import Message from '@app/components/Message';

import classes from './toast.module.css';

const Toast = props => {
    const { message, type } = props;

    return (
        <div className={classes.root}>
            <Message type={type} message={message} />
        </div>
    );
};

Toast.propTypes = {
    message: string.isRequired,
    type: oneOf(['info', 'warning', 'error', 'success']).isRequired
};

export default Toast;
