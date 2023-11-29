import classnames from 'classnames';
import { RadioGroup as InformedRadioGroup } from 'informed';
import {
    arrayOf,
    number,
    node,
    oneOfType,
    shape,
    string,
    bool
} from 'prop-types';
import React from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { Message } from '@app/components/Field';

import Radio from './radio';
import defaultClasses from './radioGroup.module.css';

const RadioGroup = props => {
    const {
        children,
        classes: propClasses,
        disabled,
        field,
        id,
        items,
        message,
        ...rest
    } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);

    const options =
        children ||
        items.map(({ value, ...item }) => {
            return (
                <Radio
                    key={value}
                    disabled={disabled}
                    {...item}
                    classes={{
                        label: classes.radioLabel,
                        root: classnames(classes.radioContainer, {
                            [classes.radioContainerNormal]:
                                value !== fieldState.value && !disabled,
                            [classes.radioContainerActive]:
                                value === fieldState.value && !disabled,
                            [classes.radioContainerDisabled]: disabled
                        })
                    }}
                    id={`${field}--${value}`}
                    value={value}
                />
            );
        });

    return (
        <div className={classes.root}>
            <div className={classes.radioGroup}>
                <InformedRadioGroup {...rest} field={field} id={id}>
                    {options}
                </InformedRadioGroup>
            </div>
            <Message className={classes.message} fieldState={fieldState}>
                {message}
            </Message>
        </div>
    );
};

RadioGroup.propTypes = {
    children: node,
    classes: shape({
        root: string,
        radioGroup: string,
        radioContainer: string,
        radioContainerNormal: string,
        radioContainerActive: string,
        radioContainerDisabled: string,
        radioLabel: string,
        message: string
    }),
    field: string.isRequired,
    id: string,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: node,
            value: oneOfType([number, string])
        })
    ),
    disabled: bool,
    message: node
};

export default RadioGroup;
