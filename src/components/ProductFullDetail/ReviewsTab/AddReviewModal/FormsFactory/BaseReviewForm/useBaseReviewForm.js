import { useQuery } from '@apollo/client';
import { useCallback, useState, useRef, useEffect } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useAddReviewModalContext } from '../../context';

import { useTailwindContext } from '@app/context/tailwind';
import { smoothScroll } from '@app/utils/smooth-scroll';
import { turnToApi } from '@app/utils/TurnTo';

import baseReviewFormOperations from './baseReviewForm.gql';

export const useBaseReviewForm = () => {
    const { data: countries } = useQuery(
        baseReviewFormOperations.queries.getCountriesQuery
    );

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const [state, api] = useAddReviewModalContext();
    const {
        storeConfig,
        catItemId,
        productName,
        productSku,
        productSmallImage,
        savedBaseFormValues: baseFormValues,
        reviewMedia,
        reviewMediaThumbnails,
        contentRef
    } = state;

    const fileInputRef = useRef();

    const [areGuidelinesExpanded, setAreGuidelinesExpanded] = useState(false);
    const [isInitialDataLoading, setIsInitialDataLoading] = useState(false);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const toggleGuidelinesExpanded = useCallback(() => {
        setAreGuidelinesExpanded(prevState => !prevState);
    }, []);

    const saveBaseFormValues = useCallback(
        values => {
            api.saveBaseFormValues(values);
        },
        [api]
    );

    const handleImageUpload = useCallback(
        async e => {
            try {
                api.setIsAddingImage(true);

                const file = e.target.files[0];
                const reader = new FileReader();
                await reader.readAsDataURL(file);
                api.setMediaItemToAdd({
                    name: file.name
                });

                api.goToAddMediaToProductGalleryForm();

                const response = await turnToApi.uploadImage({
                    storeConfig,
                    file
                });

                api.setMediaItemToAdd({
                    ...response.data,
                    thumbnailUrl: reader.result,
                    type: 0
                });
            } catch (e) {
                console.error(e);
            } finally {
                api.setIsAddingImage(false);
            }
        },
        [api, storeConfig]
    );

    const handleGoToAddVideoForm = useCallback(() => {
        api.goToAddVideoForm();
    }, [api]);

    const handleRemoveMediaItemFromSubmitting = useCallback(
        id => {
            api.removeMediaItem(id);
        },
        [api]
    );

    const handleCancelAddMediaItem = useCallback(() => {
        api.goToInitialForm();
    }, [api]);

    const handleSubmitReviewData = useCallback(
        async formValues => {
            const data = {
                catItemId,
                media: reviewMedia,
                profile: {
                    city: formValues.city || null,
                    country: formValues.country || null,
                    state: formValues.region || null,
                    locationIsDirty: !!(
                        formValues.city ||
                        formValues.country ||
                        formValues.region
                    )
                },
                rating: formValues.rating,
                text: formValues.text,
                title: formValues.reviewTitle || ''
            };

            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.submitReviewData({
                    storeConfig,
                    sku: productSku,
                    data
                });

                api.setStagedReviewToken(response.data.stagedReviewToken);
                api.goToPersonalDataForm();
            } catch (e) {
                console.error(e);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [reviewMedia, catItemId, api, storeConfig, productSku]
    );

    const handleFormStateChange = useCallback(
        async formState => {
            if (formState.errors.rating || formState.errors.text) {
                setAreGuidelinesExpanded(false);
                await smoothScroll({
                    container: contentRef.current,
                    to: { y: 300 }
                });
            }
        },
        [contentRef]
    );

    const getInitFormData = useCallback(async () => {
        try {
            setIsInitialDataLoading(true);

            const response = await turnToApi.getInitDataForAddingReview({
                storeConfig,
                sku: productSku
            });

            api.setCatItemId(response.data.catItem.id);
        } catch (e) {
            setFormErrors([
                new Error('Something went wrong. Please try again later.')
            ]);
        } finally {
            setIsInitialDataLoading(false);
        }
    }, [api, productSku, storeConfig]);

    useEffect(() => {
        getInitFormData();
    }, [getInitFormData]);

    return {
        countries: countries?.countries || [],
        areGuidelinesExpanded,
        toggleGuidelinesExpanded,
        rating: state.rating,
        setRating: api.setRating,
        productName,
        productSmallImage,
        isRequestInProgress: isRequestInProgress,
        isInitialDataLoading: isInitialDataLoading || !catItemId,
        saveBaseFormValues,
        baseFormValues,
        reviewMediaThumbnails,
        handleImageUpload,
        handleRemoveMediaItemFromSubmitting,
        handleSubmitReviewData,
        handleFormStateChange,
        handleGoToAddVideoForm,
        handleCancelAddMediaItem,
        canAddMedia: reviewMedia.length < 5,
        formErrors,
        fileInputRef,
        isMobile
    };
};
