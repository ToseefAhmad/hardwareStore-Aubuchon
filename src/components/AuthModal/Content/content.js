import {
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
    APP_AUTH_MODAL_SIGN_UP_TAB_KEY
} from '@app-constants';
import PropTypes, { func, oneOf, shape } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useAuthModalContent } from '@app/components/AuthModal/Content/useAuthModalContent';
import Button from '@app/components/Button';
import ForgotPassword from '@app/components/ForgotPassword';
import Icon from '@app/components/Icon';
import { Close as CloseIcon, Stars as StartIcon } from '@app/components/Icons';
import { Tabs, Tab } from '@app/components/Tabs';

import classes from './content.module.css';
import RegisterTabContent from './RegisterTabContent';
import SignInTabContent from './SignInTabContent';

const AuthModalContent = props => {
    const { initialTabKey, onClose } = props;

    const {
        isScrolling,
        isShownForgotPassword,
        toggleShownForgotPassword,
        contentRef
    } = useAuthModalContent();

    return (
        <>
            <header className={classes.header}>
                <h3 className={classes.title}>
                    <Icon classes={{ icon: classes.icon }} src={StartIcon} />
                    <FormattedMessage
                        id="authModal.title"
                        defaultMessage="Membership"
                    />
                </h3>
                <Button
                    classes={{ secondary: classes.closeButton }}
                    onPress={onClose}
                >
                    <Icon src={CloseIcon} />
                </Button>
            </header>
            {isShownForgotPassword ? (
                <section className={classes.forgotPasswordSection}>
                    <ForgotPassword onCancel={toggleShownForgotPassword} />
                </section>
            ) : (
                <Tabs
                    contentRef={contentRef}
                    initialTabKey={initialTabKey}
                    name="authModalTabs"
                    classes={{
                        tabsContainer: classes.tabsContainer,
                        tabs: classes.tabs,
                        tabContent:
                            isScrolling == true
                                ? classes.tabContentAddPadding
                                : classes.tabContent
                    }}
                >
                    <Tab
                        tab="Sign In"
                        tabKey={APP_AUTH_MODAL_SIGN_IN_TAB_KEY}
                        classes={{
                            tabButton: classes.tabButton
                        }}
                    >
                        <SignInTabContent
                            onLinkBtnClick={toggleShownForgotPassword}
                        />
                    </Tab>
                    <Tab
                        tab="Register"
                        tabKey={APP_AUTH_MODAL_SIGN_UP_TAB_KEY}
                        classes={{
                            tabButton: classes.tabButton
                        }}
                    >
                        <RegisterTabContent />
                    </Tab>
                </Tabs>
            )}
        </>
    );
};

AuthModalContent.propTypes = {
    initialTabKey: oneOf([
        APP_AUTH_MODAL_SIGN_IN_TAB_KEY,
        APP_AUTH_MODAL_SIGN_UP_TAB_KEY
    ]).isRequired,
    onClose: func.isRequired,
    modalRef: shape({ current: PropTypes.instanceOf(Element) })
};

export default AuthModalContent;
