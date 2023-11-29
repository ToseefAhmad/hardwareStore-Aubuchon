import classnames from 'classnames';
import { Text as InformedText } from 'informed';
import { node, shape, string } from 'prop-types';
import React from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { FieldIcons, Message } from '@app/components/Field';

import defaultClasses from './textInput.module.css';

const TextInput = props => {
    const {
        classes: propClasses,
        field,
        icon,
        message,
        secondIcon,
        ...rest
    } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const inputClass = fieldState.error ? classes.input_error : classes.input;
    const iconClass = classes.icon ? { icon: classes.icon } : {};
    const messageClass = classes.rootError
        ? { root_error: classes.rootError }
        : {};

    return (
        <div className={classes.root}>
            <FieldIcons icon={icon} secondIcon={secondIcon} classes={iconClass}>
                <InformedText
                    {...rest}
                    className={classnames(inputClass, {
                        [classes.iconPadding]: !!icon
                    })}
                    field={field}
                />
            </FieldIcons>
            <Message fieldState={fieldState} classes={messageClass}>
                {message}
            </Message>
        </div>
    );
};

TextInput.propTypes = {
    classes: shape({
        root: string,
        input: string,
        icon: string,
        iconPadding: string,
        rootError: string
    }),
    field: string.isRequired,
    icon: node,
    secondIcon: node,
    message: node
};

export default TextInput;
