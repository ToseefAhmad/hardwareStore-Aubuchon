import { string, bool, func, shape } from 'prop-types';
import React from 'react';
import { Eye, EyeOff } from 'react-feather';

import { usePassword } from '@magento/peregrine/lib/talons/Password/usePassword';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import TextInput from '@app/components/TextInput';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import defaultClasses from './password.module.css';

const Password = props => {
    const {
        label,
        fieldName,
        isToggleButtonHidden,
        autoComplete,
        validate,
        required,
        fieldClasses,
        classes: propsClasses,
        ...otherProps
    } = props;

    const { handleBlur, togglePasswordVisibility, visible } = usePassword();
    const classes = useStyle(defaultClasses, propsClasses);

    const fieldType = visible ? 'text' : 'password';
    const passwordButton = !isToggleButtonHidden ? (
        <button
            className={classes.eyeButton}
            onClick={togglePasswordVisibility}
            type="button"
        >
            <Icon src={visible ? Eye : EyeOff} />
        </button>
    ) : null;

    return (
        <Field classes={fieldClasses} label={label} required={required}>
            <TextInput
                {...otherProps}
                icon={passwordButton}
                autoComplete={autoComplete}
                field={fieldName}
                type={fieldType}
                validate={validate}
                placeholder="Enter your password"
                onBlur={handleBlur}
                classes={{
                    icon: classes.icon,
                    iconPadding: classes.iconPadding,
                    rootError: classes.rootError
                }}
            />
        </Field>
    );
};

Password.propTypes = {
    autoComplete: string,
    label: string,
    fieldName: string,
    isToggleButtonHidden: bool,
    validate: func,
    required: bool,
    fieldClasses: shape({
        root: string,
        label: string
    }),
    classes: shape({
        rootError: string
    })
};

Password.defaultProps = {
    isToggleButtonHidden: true,
    validate: isRequired,
    fieldClasses: {}
};

export default Password;
