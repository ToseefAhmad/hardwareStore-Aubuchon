import classnames from 'classnames';
import { Checkbox as InformedCheckbox, useFieldApi } from 'informed';
import { bool, node, number, shape, string } from 'prop-types';
import React, { useEffect } from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { Message } from '@app/components/Field';
import { Checkmark } from '@app/components/Icons';

import defaultClasses from './checkbox.module.css';

// eslint-disable-next-line no-warning-comments
/* TODO: change lint config to use `label-has-associated-control` */
/* eslint-disable jsx-a11y/label-has-for */

const Checkbox = props => {
    const {
        ariaLabel,
        classes: propClasses,
        field,
        fieldValue,
        id,
        label,
        message,
        rating,
        children,
        isMessageOnNewLine,
        ...rest
    } = props;
    const fieldApi = useFieldApi(field);
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const icon = fieldState.value ? <Icon src={Checkmark} /> : null;

    useEffect(() => {
        if (fieldValue != null && fieldValue !== fieldState.value) {
            fieldApi.setValue(fieldValue);
        }
    }, [fieldApi, fieldState.value, fieldValue]);

    return (
        <div className={classes.root}>
            <label
                aria-label={ariaLabel}
                className={classnames(classes.checkbox, {
                    [classes.checkboxRating]: rating
                })}
                htmlFor={id}
            >
                <InformedCheckbox
                    {...rest}
                    className={classnames({
                        [classes.input]: !props.disabled,
                        [classes.inputDisabled]: props.disabled
                    })}
                    field={field}
                    id={id}
                />
                <span className={classes.icon}>{icon}</span>

                {children ? (
                    children
                ) : (
                    <span className={classes.label}>{label}</span>
                )}
            </label>
            <Message
                fieldState={fieldState}
                isMessageOnNewLine={isMessageOnNewLine}
            >
                {message}
            </Message>
        </div>
    );
};

Checkbox.propTypes = {
    ariaLabel: string,
    classes: shape({
        root: string,
        count: string,
        checkbox: string,
        checkboxRating: string,
        input: string,
        inputDisabled: string,
        icon: string,
        label: string,
        message: string
    }),
    count: number,
    field: string.isRequired,
    id: string,
    label: node,
    message: node,
    fieldValue: bool,
    disabled: bool,
    rating: bool,
    children: node,
    isMessageOnNewLine: bool
};

Checkbox.defaultProps = {
    isMessageOnNewLine: false
};

export default Checkbox;

/* eslint-enable jsx-a11y/label-has-for */
