import { func, node, string, object, shape, bool } from 'prop-types';
import React, { createContext, useContext, useReducer, useMemo } from 'react';

import { ADD_REVIEW_MODAL_ACTIONS } from './addReviewModal.actions.types';
import { initialStateFragment, reducer } from './addReviewModal.reducer';

const AddReviewModalContext = createContext();

export const AddReviewModalContextProvider = props => {
    const {
        children,
        storeConfig,
        productDetails,
        contentRef,
        handleCloseModal,
        setIsSubmitFailed
    } = props;
    const [state, dispatch] = useReducer(reducer, {
        ...initialStateFragment,
        storeConfig,
        contentRef,
        productName: productDetails.name,
        productSku: productDetails.sku,
        productSmallImage: productDetails.smallImage
    });

    const api = useMemo(() => {
        const {
            GO_TO_INITIAL_FORM,
            GO_TO_ADD_VIDEO_FORM,
            GO_TO_ADD_MEDIA_TO_PRODUCT_GALLERY_FORM,
            GO_TO_PERSONAL_DATA_FORM,
            GO_TO_SUCCESS_MESSAGE,
            SET_RATING,
            SET_MEDIA_ITEM_TO_ADD,
            RESET_MEDIA_ITEM_TO_ADD,
            SAVE_BASE_FORM_VALUES,
            SET_CAT_ITEM_ID,
            SET_IS_ADDING_IMAGE,
            SET_REVIEW_MEDIA,
            SET_REVIEW_MEDIA_THUMBNAILS,
            REMOVE_MEDIA_ITEM,
            SET_STAGED_REVIEW_TOKEN
        } = ADD_REVIEW_MODAL_ACTIONS;

        return {
            goToInitialForm: () => dispatch({ type: GO_TO_INITIAL_FORM }),
            goToAddVideoForm: () => dispatch({ type: GO_TO_ADD_VIDEO_FORM }),
            goToAddMediaToProductGalleryForm: () =>
                dispatch({ type: GO_TO_ADD_MEDIA_TO_PRODUCT_GALLERY_FORM }),
            goToPersonalDataForm: () =>
                dispatch({ type: GO_TO_PERSONAL_DATA_FORM }),
            goToSuccessMessage: () => dispatch({ type: GO_TO_SUCCESS_MESSAGE }),
            setRating: payload => dispatch({ type: SET_RATING, payload }),
            setMediaItemToAdd: payload =>
                dispatch({ type: SET_MEDIA_ITEM_TO_ADD, payload }),
            resetMediaItemToAdd: () =>
                dispatch({ type: RESET_MEDIA_ITEM_TO_ADD }),
            saveBaseFormValues: payload =>
                dispatch({ type: SAVE_BASE_FORM_VALUES, payload }),
            setCatItemId: payload =>
                dispatch({ type: SET_CAT_ITEM_ID, payload }),
            setIsAddingImage: payload =>
                dispatch({ type: SET_IS_ADDING_IMAGE, payload }),
            setReviewMedia: payload =>
                dispatch({ type: SET_REVIEW_MEDIA, payload }),
            setReviewMediaThumbnails: payload =>
                dispatch({ type: SET_REVIEW_MEDIA_THUMBNAILS, payload }),
            removeMediaItem: payload =>
                dispatch({ type: REMOVE_MEDIA_ITEM, payload }),
            setStagedReviewToken: payload =>
                dispatch({ type: SET_STAGED_REVIEW_TOKEN, payload }),
            setIsSubmitFailed,
            handleCloseModal
        };
    }, [handleCloseModal, setIsSubmitFailed]);

    return (
        <AddReviewModalContext.Provider value={[state, api]}>
            {children}
        </AddReviewModalContext.Provider>
    );
};

AddReviewModalContextProvider.propTypes = {
    children: node,
    storeConfig: shape({
        turnto_review_url: string.isRequired,
        turnto_site_key: string.isRequired,
        turnto_reviews_enabled: bool.isRequired
    }).isRequired,
    productDetails: shape({
        sku: string.isRequired,
        name: string.isRequired,
        smallImage: string.isRequired
    }),
    contentRef: object.isRequired,
    handleCloseModal: func.isRequired,
    setIsSubmitFailed: func.isRequired
};

export const useAddReviewModalContext = () => useContext(AddReviewModalContext);
