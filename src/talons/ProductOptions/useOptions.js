import { useCallback, useMemo, useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';

const STEPS_ORDER = {
    paint_sheen: 'pant_size'
};

export const useOptions = ({
    onSelectionChange,
    selectedValues,
    setSelectedColor
}) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [stepsState, setStepsState] = useState(['']);
    const [currentInfoId, setCurrentInfoId] = useState('');

    const handleSelectionChange = useCallback(
        (optionId, selection, optionCode) => {
            if (onSelectionChange) {
                onSelectionChange(optionId, selection, optionCode);
                const nextStep = STEPS_ORDER[optionCode];

                if (!stepsState.includes(nextStep) && nextStep) {
                    setStepsState(prevState => [...prevState, nextStep]);
                }
            }
        },
        [stepsState, onSelectionChange]
    );

    const selectedValueMap = useMemo(() => {
        const values = new Map();

        for (const { option_label, value_label } of selectedValues) {
            selectedValueMap.set(option_label, value_label);
        }

        return values;
    }, [selectedValues]);

    const handleOpenInfo = useCallback(
        value => {
            setCurrentInfoId(value);
            toggleModal({
                identifier: `${MODAL_NAMES.optionInfoModal}-${value}`
            });
        },
        [toggleModal]
    );

    const handleCloseInfo = useCallback(() => {
        setCurrentInfoId('');
        toggleModal();
    }, [toggleModal]);

    const setColor = useCallback(
        value => {
            setSelectedColor(value);
            if (!stepsState.includes('paint_sheen')) {
                setStepsState(prevState => [...prevState, 'paint_sheen']);
            }
        },
        [stepsState, setSelectedColor]
    );

    return {
        handleSelectionChange,
        selectedValueMap,
        stepsState,
        handleCloseInfo,
        handleOpenInfo,
        currentInfoId,
        setColor
    };
};
