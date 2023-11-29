import { Form } from 'informed';
import PropTypes, { bool, func } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import TextArea from '@app/components/TextArea';

import classes from './checkInForm.module.css';

const CheckInForm = props => {
    const { isLoading, onSubmit, submitButtonRef, isSubmitted } = props;

    return (
        <div className={classes.root}>
            <Form onSubmit={onSubmit}>
                <p className={classes.text}>
                    Turn on your hazard lights and/or describe your vehicle and
                    where you are parked below
                </p>
                <Field id="message">
                    <TextArea
                        classes={{
                            root: classes.textAreaRoot,
                            input: classes.textAreaInput
                        }}
                        field="message"
                        placeholder="i.e. white SUV parked in the reserved curbside spot"
                        disabled={isLoading}
                    />
                </Field>
                <div className={classes.buttonContainer} ref={submitButtonRef}>
                    <Button
                        type="submit"
                        priority="high"
                        isLoading={isLoading}
                        isSuccess={isSubmitted}
                    >
                        <FormattedMessage
                            id="global.reviewField"
                            defaultMessage="I’m At The Store"
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

CheckInForm.propTypes = {
    isLoading: bool,
    onSubmit: func.isRequired,
    submitButtonRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    isSubmitted: bool
};

export default CheckInForm;
