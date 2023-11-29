import { bool, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import { Message } from '@app/components/Field';
import Select from '@app/components/Select';
import TextInput from '@app/components/TextInput';

import defaultClasses from './dateOfBirth.module.css';
import { useDateOfBirth } from './useDateOfBirth';

const DateOfBirth = props => {
    const {
        classes: propClasses,
        field,
        initialValue,
        disabled,
        ...rest
    } = props;

    const classes = useStyle(defaultClasses, propClasses);

    const {
        error,
        dayFieldName,
        monthFieldName,
        dayOptionsList,
        monthOptionsList,
        dayOfBirth,
        monthOfBirth
    } = useDateOfBirth({ dateFieldName: field, initialValue });
    return (
        <fieldset className={classes.root}>
            <Select
                field={dayFieldName}
                items={dayOptionsList}
                disabled={disabled}
                isSearchable={true}
                placeholder={dayOfBirth !== 'none' ? dayOfBirth : '- Day -'}
            />
            <Select
                field={monthFieldName}
                items={monthOptionsList}
                disabled={disabled}
                isSearchable={true}
                placeholder={
                    monthOfBirth !== 'none' ? monthOfBirth : '- Month -'
                }
            />
            <div className={classes.hiddenInput}>
                <TextInput {...rest} field={field} disabled={disabled} />
            </div>
            <Message fieldState={{ error }} />
        </fieldset>
    );
};

DateOfBirth.propTypes = {
    classes: shape({
        root: string,
        hiddenInput: string
    }),
    field: string.isRequired,
    initialValue: string,
    disabled: bool
};

export default DateOfBirth;
