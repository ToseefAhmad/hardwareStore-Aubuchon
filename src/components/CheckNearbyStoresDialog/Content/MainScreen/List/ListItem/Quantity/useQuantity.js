import { useFieldApi } from 'informed';
import { useEffect } from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

export const useQuantity = ({ maxValue, initialValue = 0, minValue }) => {
    const { value } = useFieldState('qty');

    const quantityFieldApi = useFieldApi('qty');

    const isDisabledDecrease = !value || value < minValue + 1;
    const isDisabledIncrease = value >= maxValue;

    const handleDecrease = () => {
        if (isDisabledDecrease) return;

        quantityFieldApi.setValue(value - 1);
    };

    const handleIncrease = () => {
        if (isDisabledIncrease) return;

        quantityFieldApi.setValue(+value + 1);
    };

    useEffect(() => {
        quantityFieldApi.setValue(initialValue);
    }, [initialValue, quantityFieldApi]);

    useEffect(() => {
        value > maxValue && quantityFieldApi.setValue(maxValue);
    }, [maxValue, value, quantityFieldApi]);

    return {
        value,
        isDisabledDecrease,
        isDisabledIncrease,
        handleDecrease,
        handleIncrease
    };
};
