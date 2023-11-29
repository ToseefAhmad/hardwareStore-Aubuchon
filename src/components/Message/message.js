import classnames from 'classnames';
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { Info, CheckmarkCircled } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';

import classes from './message.module.css';

const IconComponents = {
    error: Info,
    success: CheckmarkCircled,
    warning: Info,
    info: Info
};

const Message = props => {
    const { type, message, buttons } = props;

    return (
        <div
            className={classnames(classes.root, {
                [classes.error]: type === 'error',
                [classes.success]: type === 'success',
                [classes.warning]: type === 'warning',
                [classes.info]: type === 'info'
            })}
        >
            <Icon
                classes={{
                    icon: classnames(classes.icon, {
                        [classes.iconRed]: type === 'error',
                        [classes.iconGreen]:
                            type === 'success' || type === 'info',
                        [classes.iconYellow]: type === 'warning'
                    })
                }}
                src={IconComponents[type]}
            />
            <p className={classes.paragraph}>{message}</p>
            {!!buttons.length && (
                <div className={classes.buttons}>
                    {buttons.map(({ key, label, onClick }) => (
                        <LinkButton
                            key={key}
                            classes={{
                                rootSecondary: classes.linkButton
                            }}
                            onClick={onClick}
                        >
                            {label}
                        </LinkButton>
                    ))}
                </div>
            )}
        </div>
    );
};

Message.propTypes = {
    isSmall: bool,
    type: oneOf(['error', 'success', 'warning', 'info']).isRequired,
    message: string.isRequired,
    buttons: arrayOf(
        shape({
            label: string.isRequired,
            onClick: func.isRequired
        })
    )
};

Message.defaultProps = {
    buttons: []
};

export default Message;
