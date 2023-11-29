import { array, bool, func, string, object } from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';

import FormError from '@magento/venia-ui/lib/components/FormError';

import ThatIsMeScreenShimmer from '@app/components/CreateAccount/ScreensFactory/ThatIsMe/thatIsMe.shimmer';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';
import { useModal } from '@app/pages/CheckoutSuccessPage/CreateAccount/Modal/useModal';

import classes from './modal.module.css';

const ThatIsMeScreenForm = lazy(() =>
    import('@app/components/CreateAccount/ScreensFactory/ThatIsMe/Form')
);

const Modal = ({
    userList,
    password,
    handleSignUp,
    handleCancel,
    signUpData
}) => {
    const {
        state: { isLoading, formErrors },
        radioListData,
        handleSubmit
    } = useModal({ handleSignUp, userList, password, signUpData });

    return (
        <SimpleModal
            modalName={MODAL_NAMES.successPageCreateAccount}
            fullHeight={false}
            className={classes.modal}
        >
            <Suspense fallback={<ThatIsMeScreenShimmer />}>
                <div className={classes.content}>
                    <FormError
                        classes={{ errorMessage: classes.errorMessage }}
                        errors={formErrors}
                    />
                    <p className={classes.paragraph}>
                        <FormattedMessage
                            id="thatIsMeScreen.descriptionText"
                            defaultMessage="Did we find you?"
                        />
                    </p>
                    <ThatIsMeScreenForm
                        radioListData={radioListData}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                        cancelButtonText="Use data from order"
                    />
                </div>
            </Suspense>
        </SimpleModal>
    );
};

Modal.defaultProps = {
    userList: [],
    handleCancel: () => {}
};

Modal.propTypes = {
    userList: array,
    isOpen: bool,
    handleSignUp: func.isRequired,
    handleCancel: func,
    password: string,
    signUpData: object
};

export default Modal;
