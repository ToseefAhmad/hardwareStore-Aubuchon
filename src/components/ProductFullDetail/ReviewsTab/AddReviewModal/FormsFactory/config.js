import { ADD_REVIEW_MODAL_FORMS } from '../context/addReviewModal.consts';
import InitialForm from './BaseReviewForm';
import MediaAddForm from './MediaAddForm';
import PersonalDataForm from './PersonalDataForm';
import SuccessMessage from './SuccessMessage';
import VideoUploadForm from './VideoUploadForm';

const {
    INITIAL,
    ADD_VIDEO,
    ADD_MEDIA_TO_PRODUCT_GALLERY,
    PERSONAL_DATA,
    SUCCESS_MESSAGE
} = ADD_REVIEW_MODAL_FORMS;

export const ADD_REVIEW_MODAL_CONTENT_COMPONENTS = {
    [INITIAL]: {
        Component: InitialForm
    },
    [ADD_VIDEO]: {
        Component: VideoUploadForm
    },
    [ADD_MEDIA_TO_PRODUCT_GALLERY]: {
        Component: MediaAddForm
    },
    [PERSONAL_DATA]: {
        Component: PersonalDataForm
    },
    [SUCCESS_MESSAGE]: {
        Component: SuccessMessage
    }
};
