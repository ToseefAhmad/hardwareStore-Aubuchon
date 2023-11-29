import { Form } from 'informed';
import React from 'react';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import TextInput from '@app/components/TextInput';
import {
    ifNotEmptyHasLengthAtLeast,
    isEmail,
    isRequired
} from '@app/overrides/venia-ui/util/formValidators';

import classes from './personalDataForm.module.css';
import { usePersonalDataForm } from './usePersonalDataForm';

const PersonalDataForm = () => {
    const { handleSubmit, isRequestInProgress } = usePersonalDataForm();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h3>Find your profile</h3>
                <p>Please provide your name and email address.</p>
            </div>
            <Form className={classes.shortForm} onSubmit={handleSubmit}>
                <fieldset className={classes.personalDataFields}>
                    <Field
                        classes={{ root: classes.fieldRoot }}
                        id="firstName"
                        label="First Name"
                        required
                    >
                        <TextInput field="firstName" validate={isRequired} />
                    </Field>
                    <Field
                        classes={{ root: classes.fieldRoot }}
                        id="lastName"
                        label="Last Name"
                        required
                    >
                        <TextInput field="lastName" validate={isRequired} />
                    </Field>
                    <Field
                        classes={{ root: classes.fieldRoot }}
                        id="email"
                        label="Email"
                        required
                    >
                        <TextInput field="email" validate={isEmail} />
                    </Field>
                    <Field
                        classes={{ root: classes.fieldRoot }}
                        id="nickName"
                        label="Nickname"
                    >
                        <TextInput
                            field="nickName"
                            validate={value =>
                                ifNotEmptyHasLengthAtLeast(value, 5)
                            }
                        />
                    </Field>
                    <p className={classes.tinyText}>
                        Leave blank to use your first name and last initial
                    </p>
                </fieldset>
                <div className={classes.submitButtonContainer}>
                    <Button
                        priority="high"
                        type="submit"
                        isLoading={isRequestInProgress}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PersonalDataForm;
