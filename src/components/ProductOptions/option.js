import { arrayOf, func, number, object, oneOfType, string } from 'prop-types';
import React, { useMemo, useRef } from 'react';

import SheenStep from '@app/components/ProductOptions/SheenStep';
import SizeStep from '@app/components/ProductOptions/SizeStep';
import { useOption } from '@app/talons/ProductOptions/useOption';

import classes from './option.module.css';

const getItemKey = ({ value_index }) => value_index;

const getStepComponent = attribute_code => {
    let component = null;

    switch (attribute_code) {
        case 'paint_sheen': {
            component = SheenStep;
            break;
        }
        case 'pant_size': {
            component = SizeStep;
            break;
        }
    }

    return component;
};

const Option = ({
    attribute_code,
    attribute_id,
    onSelectionChange,
    selectedValue,
    values
}) => {
    const optionContainerRef = useRef();
    const { handleSelectionChange, initialSelection } = useOption({
        attribute_id,
        attribute_code,
        onSelectionChange,
        selectedValue,
        values
    });

    const ValueList = useMemo(() => getStepComponent(attribute_code), [
        attribute_code
    ]);

    return (
        <div className={classes.root} ref={optionContainerRef}>
            <ValueList
                getItemKey={getItemKey}
                selectedValue={initialSelection}
                items={values}
                onSelectionChange={handleSelectionChange}
                optionContainerRef={optionContainerRef}
            />
        </div>
    );
};

Option.defaultProps = {
    onSelectionChange: () => {},
    setCurrentInfoId: () => {}
};

Option.propTypes = {
    attribute_code: string.isRequired,
    attribute_id: string,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired,
    setCurrentInfoId: func
};

export default Option;
