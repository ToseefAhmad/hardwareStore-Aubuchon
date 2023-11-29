import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import ProductParentCategoryLink from '@app/components/ProductParentCategoryLink';

import classes from './specialOrderContent.module.css';
import { useSpecialOrderContent } from './useSpecialOrderContent';

const SpecialOrderContent = () => {
    const {
        toggleModal,
        handleSubmit,
        city,
        pickupStoreInventory,
        categories,
        checkNearbyStoresHandler
    } = useSpecialOrderContent();

    const similarStockItemsText = categories.length ? (
        <>
            , browse similar{' '}
            <ProductParentCategoryLink
                categories={categories}
                text="similar in stock items"
                onClick={toggleModal}
            />{' '}
            for pickup today or tomorrow or
        </>
    ) : (
        ''
    );

    return (
        <>
            <div className={classes.header}>
                <h3>Special Order Item</h3>
                <Button
                    classes={{ secondary: classes.closeButton }}
                    onPress={toggleModal}
                >
                    <Icon src={CloseIcon} />
                </Button>
            </div>
            <p className={classes.paragraph}>
                Order now for free pickup at {city} on{' '}
                <span className={classes.strong}>
                    {pickupStoreInventory?.boss_available}.
                </span>
            </p>
            <p className={classes.text}>
                If you need it sooner
                {similarStockItemsText}{' '}
                <LinkButton onPress={checkNearbyStoresHandler}>
                    check nearby stores
                </LinkButton>
                .
            </p>
            <div className={classes.controls}>
                <Button
                    type="button"
                    priority="low"
                    onPress={toggleModal}
                    classes={{
                        secondary: classes.secondary
                    }}
                >
                    <FormattedMessage
                        id="global.cancel"
                        defaultMessage="Cancel"
                    />
                </Button>
                <Button
                    type="button"
                    priority="high"
                    onPress={handleSubmit}
                    classes={{
                        primary: classes.primary
                    }}
                >
                    <FormattedMessage
                        id="global.switchAnyways"
                        defaultMessage="Add Anyways"
                    />
                </Button>
            </div>
        </>
    );
};

export default SpecialOrderContent;
