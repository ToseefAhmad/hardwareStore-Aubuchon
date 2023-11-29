import { ADD_REVIEW_MODAL_ACTIONS } from './addReviewModal.actions.types';
import { ADD_REVIEW_MODAL_FORMS } from './addReviewModal.consts';

const {
    INITIAL,
    ADD_VIDEO,
    ADD_MEDIA_TO_PRODUCT_GALLERY,
    PERSONAL_DATA,
    SUCCESS_MESSAGE
} = ADD_REVIEW_MODAL_FORMS;
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

export const initialStateFragment = {
    currentForm: INITIAL,
    rating: null,
    reviewMedia: [],
    reviewMediaThumbnails: [],
    mediaItemToAdd: null,
    savedBaseFormValues: {},
    catItemId: null,
    isAddingImage: false,
    stagedReviewToken: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case GO_TO_INITIAL_FORM:
            return {
                ...state,
                currentForm: INITIAL
            };
        case GO_TO_ADD_VIDEO_FORM:
            return {
                ...state,
                currentForm: ADD_VIDEO
            };
        case GO_TO_ADD_MEDIA_TO_PRODUCT_GALLERY_FORM:
            return {
                ...state,
                currentForm: ADD_MEDIA_TO_PRODUCT_GALLERY
            };
        case GO_TO_PERSONAL_DATA_FORM:
            return {
                ...state,
                currentForm: PERSONAL_DATA
            };
        case GO_TO_SUCCESS_MESSAGE:
            return {
                ...state,
                currentForm: SUCCESS_MESSAGE
            };
        case SET_RATING:
            return {
                ...state,
                rating: action.payload
            };
        case SET_MEDIA_ITEM_TO_ADD:
            return {
                ...state,
                mediaItemToAdd: { ...state.mediaItemToAdd, ...action.payload }
            };
        case RESET_MEDIA_ITEM_TO_ADD:
            return {
                ...state,
                mediaItemToAdd: null
            };
        case SAVE_BASE_FORM_VALUES:
            return {
                ...state,
                savedBaseFormValues: { ...action.payload }
            };
        case SET_CAT_ITEM_ID:
            return {
                ...state,
                catItemId: action.payload
            };
        case SET_IS_ADDING_IMAGE:
            return {
                ...state,
                isAddingImage: action.payload
            };
        case SET_REVIEW_MEDIA:
            return {
                ...state,
                reviewMedia: [...state.reviewMedia, ...action.payload]
            };
        case SET_REVIEW_MEDIA_THUMBNAILS:
            return {
                ...state,
                reviewMediaThumbnails: [
                    ...state.reviewMediaThumbnails,
                    action.payload
                ]
            };
        case REMOVE_MEDIA_ITEM:
            return {
                ...state,
                reviewMedia: state.reviewMedia.filter(
                    item => item.id !== action.payload
                ),
                reviewMediaThumbnails: state.reviewMediaThumbnails.filter(
                    item => item.id !== action.payload
                )
            };
        case SET_STAGED_REVIEW_TOKEN:
            return {
                ...state,
                stagedReviewToken: action.payload
            };

        default:
            throw new Error(
                '[CreateAccountContextProvider]: Unknown action type!'
            );
    }
};
