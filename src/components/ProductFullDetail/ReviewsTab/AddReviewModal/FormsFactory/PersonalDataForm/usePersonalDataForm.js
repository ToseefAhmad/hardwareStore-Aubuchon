import { useCallback, useState } from 'react';

import { useAddReviewModalContext } from '../../context';

import { turnToApi } from '@app/utils/TurnTo';

export const usePersonalDataForm = () => {
    const [state, api] = useAddReviewModalContext();
    const { storeConfig, productSku, stagedReviewToken } = state;

    const [isRequestInProgress, setIsRequestInProgress] = useState(false);

    const handleSubmit = useCallback(
        async formValues => {
            try {
                setIsRequestInProgress(true);

                await turnToApi.submitReview({
                    storeConfig,
                    sku: productSku,
                    stagedContentToken: stagedReviewToken,
                    data: formValues
                });

                api.goToSuccessMessage();
            } catch (e) {
                api.setIsSubmitFailed(true);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [stagedReviewToken, productSku, api, storeConfig]
    );

    return { handleSubmit, isRequestInProgress };
};
