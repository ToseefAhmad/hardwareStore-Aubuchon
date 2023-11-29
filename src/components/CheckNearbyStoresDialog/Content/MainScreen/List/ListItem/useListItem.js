import { useCallback } from 'react';

export const useListItem = ({
    store: { id, brand },
    product: { sku },
    onSubmit
}) => {
    const handleSubmit = useCallback(
        ({ qty }) => {
            onSubmit({
                sku,
                storeId: id,
                brand,
                qty
            });
        },
        [onSubmit, id, sku, brand]
    );

    return {
        handleSubmit
    };
};
