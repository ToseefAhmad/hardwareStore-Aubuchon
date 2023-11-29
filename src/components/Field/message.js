import classnames from 'classnames';
import { bool, node, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { InfoFilled } from '@app/components/Icons';

import defaultClasses from './message.module.css';

const Message = props => {
    const {
        children,
        classes: propClasses,
        fieldState,
        isMessageOnNewLine
    } = props;
    const { error } = fieldState;

    const classes = useStyle(defaultClasses, propClasses);
    const className = error ? classes.root_error : classes.root;
    let translatedErrorMessage;

    if (error) {
        translatedErrorMessage = (
            <>
                <Icon src={InfoFilled} />
                <span>
                    <FormattedMessage
                        id={error.id}
                        defaultMessage={error.defaultMessage}
                        values={{ value: error.value }}
                    />
                </span>
            </>
        );
    }

    if (!translatedErrorMessage && !children) {
        return null;
    }

    return (
        <span
            className={classnames(className, {
                [classes.newLine]: isMessageOnNewLine
            })}
        >
            {translatedErrorMessage || children}
        </span>
    );
};

Message.propTypes = {
    children: node,
    classes: shape({
        root: string,
        root_error: string
    }),
    fieldState: shape({
        error: shape({
            id: string,
            defaultMessage: string,
            value: oneOfType([number, string])
        })
    }),
    isMessageOnNewLine: bool
};

Message.defaultProps = {
    fieldState: {}
};

export default Message;
