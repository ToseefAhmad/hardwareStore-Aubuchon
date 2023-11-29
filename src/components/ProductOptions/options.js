import { array, func } from 'prop-types';
import React from 'react';

import OptionInfoModal from '@app/components/ProductOptions/InfoModal/optionInfoModal';
import OptionHeader from '@app/components/ProductOptions/optionHeader';
import { useOptions } from '@app/talons/ProductOptions/useOptions';

import ColorStep from './ColorStep';
import Option from './option';
import classes from './options.module.css';

const Options = ({
    onSelectionChange,
    options,
    selectedValues,
    setSelectedColor
}) => {
    const {
        handleSelectionChange,
        selectedValueMap,
        stepsState,
        handleOpenInfo,
        handleCloseInfo,
        currentInfoId,
        setColor
    } = useOptions({
        onSelectionChange,
        setSelectedColor,
        selectedValues
    });

    // Render a list of options passing in any pre-selected values.
    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <ColorStep setColor={setColor} />
            </div>

            {options.map((option, index) => {
                const isStepVisible = stepsState.includes(
                    option.attribute_code
                );

                return (
                    <div key={option.attribute_id} className={classes.item}>
                        <OptionHeader
                            stepNumber={index + 2}
                            label={option.label}
                            attributeCode={option.attribute_code}
                            handleOpenInfo={handleOpenInfo}
                        />
                        {isStepVisible && (
                            <Option
                                {...option}
                                key={option.attribute_id}
                                onSelectionChange={handleSelectionChange}
                                selectedValue={selectedValueMap.get(
                                    option.label
                                )}
                            />
                        )}
                    </div>
                );
            })}

            <OptionInfoModal
                handleClose={handleCloseInfo}
                label={currentInfoId}
                modalId={currentInfoId}
            />
        </div>
    );
};

Options.defaultProps = {
    setSelectedColor: () => {},
    selectedValues: []
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    setSelectedColor: func,
    selectedValues: array
};

export default Options;
