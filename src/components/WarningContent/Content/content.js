import { func } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import StoresItem from '@app/components/StoresItem';

import classes from './content.module.css';
import { useContent } from './useContent';

const WarningContent = ({ handleAddToCart, onCancel }) => {
    const { data, handleSubmit, handleCancel } = useContent({
        handleAddToCart,
        onCancel
    });

    return (
        <>
            <div className={classes.header}>
                <h3 className={classes.title}>
                    <span className={classes.strong}>
                        Proceed with caution...
                    </span>{' '}
                    you have at least one item in your cart for pickup at the
                    following location:
                </h3>
                <Button
                    classes={{ secondary: classes.closeButton }}
                    onPress={handleCancel}
                >
                    <Icon src={CloseIcon} />
                </Button>
            </div>
            <div className={classes.content}>
                <StoresItem
                    data={data}
                    isSelectStoreButton={false}
                    classes={{
                        root: classes.storesItemRoot,
                        statusOpen: classes.open,
                        statusClose: classes.close,
                        content: classes.storesItemContent,
                        info: classes.storesItemInfo,
                        workHours: classes.workHours
                    }}
                    isHyphen={false}
                />
            </div>
            <p className={classes.text}>
                You can only place orders for one pickup location at a time.{' '}
                <span className={classes.strong}>
                    {handleAddToCart
                        ? 'Adding the item will clear your current cart and change your pickup location.'
                        : 'Switching stores will clear your current cart and change your pickup location.'}
                </span>
            </p>
            <div className={classes.controls}>
                <Button
                    type="button"
                    priority="high"
                    onPress={handleSubmit}
                    classes={{
                        primary: classes.primary
                    }}
                >
                    {handleAddToCart ? 'Add' : 'Switch'} Anyways
                </Button>
                <Button
                    type="button"
                    priority="low"
                    onPress={handleCancel}
                    classes={{
                        secondary: classes.secondary
                    }}
                >
                    <FormattedMessage
                        id="global.cancel"
                        defaultMessage="Cancel"
                    />
                </Button>
            </div>
        </>
    );
};

WarningContent.propTypes = {
    handleAddToCart: func,
    onCancel: func
};

export default WarningContent;
