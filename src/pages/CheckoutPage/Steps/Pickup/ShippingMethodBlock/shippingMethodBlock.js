import classnames from 'classnames';
import { bool } from 'prop-types';
import React from 'react';

import RadioGroup from '@app/components/RadioGroup';
import Radio from '@app/components/RadioGroup/radio';
import { isRequired } from '@app/overrides/venia-ui/util/formValidators';

import classes from './shippingMethodBlock.module.css';
import { useShippingMethodBlock } from './useShippingMethodBlock';

const ShippingMethodBlock = props => {
    const { disabled } = props;

    const {
        fieldName,
        fieldState,
        derivedShippingMethods,
        handleEvent
    } = useShippingMethodBlock();

    return (
        <div>
            <RadioGroup
                field={fieldName}
                validate={isRequired}
                onBlur={() => {
                    handleEvent();
                }}
            >
                {derivedShippingMethods.map(
                    ({ serialized_value, label, description }) => (
                        <Radio
                            key={serialized_value}
                            id={serialized_value}
                            value={serialized_value}
                            disabled={disabled}
                            classes={{
                                root: classnames(classes.radioContainer, {
                                    [classes.radioContainerNormal]:
                                        serialized_value !== fieldState.value &&
                                        !disabled,
                                    [classes.radioContainerActive]:
                                        serialized_value === fieldState.value &&
                                        !disabled,
                                    [classes.radioContainerDisabled]: disabled
                                }),
                                input: classes.radioInput
                            }}
                        >
                            <div className={classes.item}>
                                <strong className={classes.strong}>
                                    {label}
                                </strong>
                                {description && (
                                    <p className={classes.paragraph}>
                                        {description}
                                    </p>
                                )}
                            </div>
                        </Radio>
                    )
                )}
            </RadioGroup>
        </div>
    );
};

ShippingMethodBlock.propTypes = {
    disabled: bool
};

ShippingMethodBlock.defaultProps = {
    disabled: false
};

export default ShippingMethodBlock;
