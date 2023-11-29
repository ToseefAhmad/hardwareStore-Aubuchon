import classnames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';

import classes from './content.module.css';
import CheckNearbyStoresDialogContentShimmer from './content.shimmer';
import ErrorScreen from './ErrorScreen';
import MainScreen from './MainScreen';
import { useContent } from './useContent';
import WarningScreen from './WarningScreen';

const CheckNearbyStoresPopupContent = () => {
    const {
        listData,
        isEmptyList,
        isShownWarningScreen,
        storesListLoading,
        error,
        handleSubmitMainScreen,
        handleAddToCart,
        handleCancelWarningForm,
        onClose,
        modalId
    } = useContent();

    let content = <CheckNearbyStoresDialogContentShimmer />;

    if (!storesListLoading) {
        content = (
            <>
                {!isShownWarningScreen && modalId && (
                    <header
                        className={classnames(classes.header, {
                            [classes.headerSecondary]: isShownWarningScreen
                        })}
                    >
                        <h3 className={classes.headerTitle}>
                            Check nearby stores
                        </h3>
                        <Button
                            classes={{
                                secondary: classes.closeButton
                            }}
                            onClick={onClose}
                        >
                            <Icon src={CloseIcon} />
                        </Button>
                    </header>
                )}
                {error ? (
                    <ErrorScreen />
                ) : (
                    <>
                        {!isEmptyList && (
                            <>
                                {!isShownWarningScreen ? (
                                    <MainScreen
                                        listData={listData}
                                        onSubmit={handleSubmitMainScreen}
                                    />
                                ) : (
                                    <WarningScreen
                                        onSubmit={handleAddToCart}
                                        onCancel={handleCancelWarningForm}
                                    />
                                )}
                            </>
                        )}
                        {isEmptyList && modalId && (
                            <div className={classes.noData}>
                                <p>
                                    <FormattedMessage
                                        id="checkNearbyStoresPopup.noDataMessage"
                                        defaultMessage="Sorry, we couldn't find information on this product in other stores."
                                    />
                                </p>
                            </div>
                        )}
                    </>
                )}
            </>
        );
    }

    return content;
};

export default CheckNearbyStoresPopupContent;
