import { Form } from 'informed';
import { arrayOf, shape, string, func, bool } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import RadioGroup from '@app/components/RadioGroup';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './form.module.css';
import Radio from './Radio';

const ThatIsMeScreenForm = props => {
    const {
        radioListData,
        onSubmit,
        onCancel,
        isLoading,
        cancelButtonText
    } = props;

    return (
        <Form className={classes.root} onSubmit={onSubmit}>
            <RadioGroup
                field="id"
                validate={isRequired}
                classes={{
                    root: classes.rootRadioGroup,
                    radioGroup: classes.radioGroup
                }}
            >
                {radioListData.map(({ id, name, location }) => (
                    <Radio
                        key={id}
                        id={id}
                        name={name}
                        location={location}
                        disabled={isLoading}
                    />
                ))}
            </RadioGroup>
            <fieldset className={classes.buttons}>
                <Button
                    classes={{
                        primary: classes.submitBtn
                    }}
                    type="submit"
                    priority="high"
                    isLoading={isLoading}
                >
                    <FormattedMessage
                        id="thatIsMeScreenForm.submitButtonText"
                        defaultMessage="That’s Me"
                    />
                </Button>
                <Button
                    classes={{
                        secondary: classes.cancelBtn
                    }}
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {cancelButtonText}
                </Button>
            </fieldset>
        </Form>
    );
};

ThatIsMeScreenForm.defaultProps = {
    cancelButtonText: 'Try Again'
};

ThatIsMeScreenForm.propTypes = {
    radioListData: arrayOf(
        shape({
            id: string.isRequired,
            name: string.isRequired,
            location: string.isRequired
        })
    ).isRequired,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
    isLoading: bool,
    cancelButtonText: string
};

export default ThatIsMeScreenForm;
