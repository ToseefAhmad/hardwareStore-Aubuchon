import { func, string } from 'prop-types';
import React, { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Phone } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './dropdown.module.css';

const StoreSwitcherDropdown = forwardRef((props, ref) => {
    const {
        ariaIdentifier,
        storeName,
        urlKey,
        address,
        phone,
        imageSrc,
        onChangeStorePress,
        toggleExpanded
    } = props;
    const [, { dispatch }] = useEventingContext();

    return (
        <aside
            ref={ref}
            role="dialog"
            id={ariaIdentifier}
            className={classes.root}
        >
            <div className={classes.info}>
                {imageSrc ? (
                    <Image
                        classes={{
                            root: classes.imageRoot,
                            image: classes.image
                        }}
                        resource={imageSrc}
                        height={116}
                        width={156}
                        alt={storeName}
                    />
                ) : (
                    <div className={classes.imagePlaceholder} />
                )}
                <div className={classes.desc}>
                    <strong className={classes.storeName}>{storeName}</strong>
                    <p className={classes.address}>
                        {address}, {storeName}
                    </p>
                    <a
                        className={classes.phone}
                        href={`tel:${phone}`}
                        onClick={() => {
                            dispatch({
                                type: 'STORE_SWITCHER_CALL_STORE'
                            });
                        }}
                    >
                        <Icon
                            classes={{ icon: classes.phoneIcon }}
                            src={Phone}
                        />
                        {phone}
                    </a>
                    <Link
                        className={classes.link}
                        to={`/stores/${urlKey}`}
                        onClick={() => {
                            toggleExpanded();
                            dispatch({
                                type: 'STORE_SWITCHER_DETAILS'
                            });
                        }}
                    >
                        <FormattedMessage
                            id="store.storeDetails"
                            defaultMessage="Store Details"
                        />
                    </Link>
                </div>
            </div>
            <Button
                classes={{
                    primary: classes.button
                }}
                priority="high"
                onPress={() => {
                    toggleExpanded();
                    onChangeStorePress();
                    dispatch({
                        type: 'STORE_CHANGE_CLICK'
                    });
                }}
            >
                <FormattedMessage
                    id="store.changeStore"
                    defaultMessage="Change Store"
                />
            </Button>
        </aside>
    );
});

StoreSwitcherDropdown.propTypes = {
    ariaIdentifier: string.isRequired,
    storeName: string.isRequired,
    urlKey: string.isRequired,
    address: string.isRequired,
    phone: string.isRequired,
    imageSrc: string,
    onChangeStorePress: func.isRequired,
    toggleExpanded: func.isRequired
};

StoreSwitcherDropdown.displayName = 'StoreSwitcherDropdown';

export default StoreSwitcherDropdown;
