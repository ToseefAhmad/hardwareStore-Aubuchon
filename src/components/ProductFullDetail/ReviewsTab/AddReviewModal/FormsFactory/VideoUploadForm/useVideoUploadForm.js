import { useCallback, useState } from 'react';

import { useAddReviewModalContext } from '../../context';

import { turnToApi } from '@app/utils/TurnTo';

export const useVideoUploadForm = () => {
    const [state, api] = useAddReviewModalContext();
    const { storeConfig } = state;

    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleVideoUpload = useCallback(
        async ({ youtubeLink }) => {
            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.uploadVideo({
                    storeConfig,
                    videoUrl: youtubeLink
                });

                api.setMediaItemToAdd({ ...response.data, type: 1 });

                api.goToAddMediaToProductGalleryForm();
            } catch (e) {
                setFormErrors([new Error('Video does not exist.')]);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [api, storeConfig]
    );

    const handleGoBack = useCallback(() => {
        api.goToInitialForm();
        setFormErrors([]);
    }, [api]);

    return {
        isRequestInProgress,
        handleVideoUpload,
        handleGoBack,
        formErrors
    };
};
