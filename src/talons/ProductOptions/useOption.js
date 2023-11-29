import { useCallback, useMemo, useState } from 'react';

export const useOption = ({
    attribute_id,
    attribute_code,
    onSelectionChange,
    selectedValue,
    values
}) => {
    const [selection, setSelection] = useState(null);

    const initialSelection = useMemo(() => {
        let initialSelection = {};
        const searchValue = selection || selectedValue;

        if (searchValue) {
            initialSelection =
                values.find(value => value.default_label === searchValue) || {};
        }

        return initialSelection;
    }, [selectedValue, selection, values]);

    const valuesMap = useMemo(() => {
        return new Map(
            values.map(value => [value.value_index, value.store_label])
        );
    }, [values]);

    const handleSelectionChange = useCallback(
        selection => {
            setSelection(valuesMap.get(selection));

            if (onSelectionChange) {
                onSelectionChange(attribute_id, selection, attribute_code);
            }
        },
        [attribute_id, attribute_code, onSelectionChange, valuesMap]
    );

    return {
        handleSelectionChange,
        initialSelection
    };
};
