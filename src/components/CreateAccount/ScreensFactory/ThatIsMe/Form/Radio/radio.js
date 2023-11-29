import classnames from 'classnames';
import { bool, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import RadioOption from '@app/components/RadioGroup/radio';

import classes from './radio.module.css';

const Radio = props => {
    const { id, name, location, disabled } = props;

    return (
        <RadioOption
            id={id}
            value={id}
            disabled={disabled}
            classes={{
                root: classnames(classes.radioContainer, {
                    [classes.radioContainerNormal]: !disabled,
                    [classes.radioContainerDisabled]: disabled
                }),
                input: classes.radioInput
            }}
        >
            <span>
                <strong className={classes.strong}>{name}</strong>{' '}
                <FormattedMessage
                    id="thatIsMeScreenForm.radioButtonLocationText"
                    defaultMessage="from {location}"
                    values={{ location }}
                />
            </span>
        </RadioOption>
    );
};

Radio.propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    location: string.isRequired,
    disabled: bool
};

export default Radio;
