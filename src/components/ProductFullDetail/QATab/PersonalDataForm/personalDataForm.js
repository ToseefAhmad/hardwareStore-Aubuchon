import { Form } from 'informed';
import { array, func, bool, string, number } from 'prop-types';
import React, { useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import FormError from '@magento/venia-ui/lib/components/FormError';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';
import TextInput from '@app/components/TextInput';
import {
    isRequired,
    ifNotEmptyHasLengthAtLeast,
    isEmail
} from '@app/overrides/venia-ui/util/formValidators';

import classes from './personalDataForm.module.css';

const PersonalDataForm = ({
    handleSubmit,
    isRequestInProgress,
    formErrors,
    withSkipOption,
    title,
    description,
    modalId,
    modalType,
    handleClose
}) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const modalName = modalId
        ? `${MODAL_NAMES.personalDataForm}-${modalType}-${modalId}`
        : MODAL_NAMES.personalDataForm;

    const onClose = useCallback(() => {
        if (handleClose) {
            handleClose();
            return;
        }

        toggleModal();
    }, [handleClose, toggleModal]);

    return (
        <SimpleModal className={classes.modalRoot} modalName={modalName}>
            <button className={classes.closeButton} onClick={onClose}>
                <Icon src={CloseIcon} />
            </button>
            <Form className={classes.root} onSubmit={handleSubmit}>
                <div>
                    <div className={classes.title}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                    <fieldset className={classes.fields}>
                        <Field
                            classes={{ root: classes.fieldRoot }}
                            id="firstName"
                            label="First Name"
                            required
                        >
                            <TextInput
                                field="firstName"
                                validate={isRequired}
                            />
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
                        <p className={classes.textUnderField}>
                            Leave blank to use your first name and last initial
                        </p>
                    </fieldset>
                </div>
                <div className={classes.submitButtonContainer}>
                    <FormError errors={formErrors} />
                    <Button
                        priority="high"
                        type="submit"
                        isLoading={isRequestInProgress}
                    >
                        Submit
                    </Button>
                    {withSkipOption && (
                        <button
                            className={classes.skipButton}
                            type="button"
                            onClick={toggleModal}
                        >
                            {"Skip, I don't want answers emailed to me"}
                        </button>
                    )}
                </div>
            </Form>
        </SimpleModal>
    );
};

PersonalDataForm.propTypes = {
    handleSubmit: func,
    isRequestInProgress: bool,
    handleClose: func,
    formErrors: array.isRequired,
    withSkipOption: bool,
    title: string,
    description: string,
    modalId: number,
    modalType: string
};

PersonalDataForm.defaultProps = {
    handleSubmit: () => {},
    isRequestInProgress: false,
    withSkipOption: false,
    title: 'Find your profile',
    description: 'Please provide your name and email address.'
};

export default PersonalDataForm;
