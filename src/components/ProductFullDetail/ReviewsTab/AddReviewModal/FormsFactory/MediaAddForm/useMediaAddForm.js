import { useCallback, useState } from 'react';

import { useAddReviewModalContext } from '../../context';

import { turnToApi } from '@app/utils/TurnTo';

export const useMediaAddForm = () => {
    const [state, api] = useAddReviewModalContext();
    const {
        isAddingImage,
        mediaItemToAdd,
        productSku,
        catItemId,
        storeConfig
    } = state;

    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleAddMediaToGallery = useCallback(
        async formValues => {
            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.addMediaToProductGallery({
                    storeConfig,
                    sku: productSku,
                    catItemId,
                    media: [{ ...mediaItemToAdd, ...formValues }]
                });

                api.setReviewMedia(response.data);
                api.setReviewMediaThumbnails({
                    id: response.data[0].id,
                    thumbnailUrl: mediaItemToAdd.thumbnailUrl
                });
                api.resetMediaItemToAdd();
                api.goToInitialForm();
            } catch (e) {
                setFormErrors([
                    new Error(
                        'Something went wrong. Please try a different image.'
                    )
                ]);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [mediaItemToAdd, api, catItemId, productSku, storeConfig]
    );

    const handleCancelAddMedia = useCallback(() => {
        api.goToInitialForm();
        api.resetMediaItemToAdd(null);
    }, [api]);

    return {
        isAddingImage,
        mediaItemToAdd,
        handleAddMediaToGallery,
        handleCancelAddMedia,
        isRequestInProgress,
        formErrors
    };
};
