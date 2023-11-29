import { arrayOf, bool, func, shape, string } from 'prop-types';
import React, { useCallback, useState, forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Location as LocationIcon } from '@app/components/Icons';
import Link from '@app/components/Link';
import StoreStatus from '@app/components/StoreComponents/Status';

import defaultClasses from './storesItem.module.css';
import StoresItemShimmer from './storesItem.shimmer';
import { useStoresItem } from './useStoresItem';

const StoresItem = forwardRef((props, ref) => {
    const {
        data,
        isCurrentStore,
        onSelectStore,
        classes: propsClasses,
        isSelectStoreButton,
        isHyphen,
        isButtonLoading: propsIsButtonLoading
    } = props;
    const {
        milesValue,
        attribute,
        storeName,
        isOpen,
        logo,
        name,
        isLoading,
        storeWorkInfo,
        id,
        url_key
    } = useStoresItem({
        data
    });
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const classes = useStyle(defaultClasses, propsClasses);
    const storeStatusClasses = propsClasses?.workHours
        ? {
              open: classes.statusOpen,
              close: classes.statusClose,
              workHours: classes.workHours
          }
        : {
              open: classes.statusOpen,
              close: classes.statusClose
          };

    const selectButtonTextValues = isCurrentStore
        ? { id: 'storesList.currentStore', defaultMessage: 'Current' }
        : { id: 'storesList.selectStore', defaultMessage: 'Select' };

    const [selectedStore, setSelectedStore] = useState(null);
    const isButtonLoading = propsIsButtonLoading && selectedStore === id;

    const handleSelectStore = () => {
        setSelectedStore(id);
        onSelectStore();
    };
    const handleClosePopup = useCallback(() => {
        if (modal.identifier) {
            toggleModal();
        }
    }, [modal.identifier, toggleModal]);

    return (
        <>
            {isLoading ? (
                <StoresItemShimmer />
            ) : (
                <div ref={ref} className={classes.root} data-attr={attribute}>
                    <div className={classes.imageContainer}>
                        <Image
                            classes={{
                                image: classes.logo
                            }}
                            src={logo}
                            alt={name}
                            onClick={toggleModal}
                        />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.info}>
                            <p className={classes.address}>
                                <Icon
                                    classes={{ icon: classes.addressIcon }}
                                    src={LocationIcon}
                                />
                                {milesValue > 0 && (
                                    <>
                                        {milesValue}
                                        <FormattedMessage
                                            id="storesList.miles"
                                            defaultMessage=" miles"
                                        />{' '}
                                    </>
                                )}
                                {url_key ? (
                                    <Link
                                        to={`/stores/${url_key}`}
                                        priority="secondary"
                                        onClick={handleClosePopup}
                                    >
                                        {storeName}
                                    </Link>
                                ) : (
                                    storeName
                                )}
                            </p>
                            <StoreStatus
                                classes={storeStatusClasses}
                                isOpen={isOpen}
                                isHyphen={isHyphen}
                                storeWorkInfo={storeWorkInfo}
                            />
                        </div>
                        {isSelectStoreButton && (
                            <Button
                                classes={{
                                    secondary: classes.selectStoreButton,
                                    disabled: classes.selectStoreButtonDisabled
                                }}
                                onPress={handleSelectStore}
                                disabled={isCurrentStore}
                                isLoading={isButtonLoading}
                            >
                                <FormattedMessage
                                    id={selectButtonTextValues.id}
                                    defaultMessage={
                                        selectButtonTextValues.defaultMessage
                                    }
                                />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
});

StoresItem.defaultProps = {
    isCurrentStore: false,
    onSelectStore: () => {},
    isSelectStoreButton: true,
    isHyphen: true
};

StoresItem.propTypes = {
    data: shape({
        city: string.isRequired,
        region_code: string.isRequired,
        schedule: arrayOf(
            shape({
                open: string,
                close: string
            })
        ).isRequired,
        specialDays: arrayOf(
            shape({
                date_from: string.isRequired,
                date_to: string.isRequired,
                time_open: string.isRequired,
                time_close: string.isRequired
            })
        ).isRequired
    }).isRequired,
    isCurrentStore: bool,
    onSelectStore: func,
    classes: shape({
        content: string,
        statusOpen: string,
        imageContainer: string,
        root: string,
        address: string,
        statusClose: string,
        workHours: string,
        info: string
    }),
    isSelectStoreButton: bool,
    isHyphen: bool,
    isButtonLoading: bool
};

export default StoresItem;
