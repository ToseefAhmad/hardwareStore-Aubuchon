import { func } from 'prop-types';
import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import Link from '@app/components/Link';
import StoreLocationSearch from '@app/components/StoreLocationSearch';
import StoresList from '@app/components/StoresList';

import CurrentStoreBlock from './CurrentStoreBlock';
import classes from './storeSelector.module.css';
import { useStoreSelector } from './useStoreSelector';

const StoreSelector = ({ onClose }) => {
    const {
        storeList,
        storeListError,
        handleStoreSelect,
        isCurrentPickupBlockExpanded,
        setIsCurrentPickupBlockExpanded,
        onStoreListScroll,
        isButtonLoading
    } = useStoreSelector();
    const outerListRef = useRef(null);
    const outerAnchorRef = useRef(null);
    const [, { dispatch }] = useEventingContext();

    return (
        <>
            <header className={classes.header}>
                <h3 className={classes.headerTitle}>
                    <FormattedMessage
                        id="storePopup.selectStore"
                        defaultMessage="Select store"
                    />
                </h3>
                <Button
                    classes={{ secondary: classes.closeButton }}
                    onPress={onClose}
                >
                    <Icon src={CloseIcon} />
                </Button>
            </header>
            <div className={classes.content} ref={outerListRef}>
                <CurrentStoreBlock
                    isCurrentPickupBlockExpanded={isCurrentPickupBlockExpanded}
                    setIsCurrentPickupBlockExpanded={
                        setIsCurrentPickupBlockExpanded
                    }
                    classes={{
                        root: classes.currentStoreBlockRoot
                    }}
                />
                <div className={classes.searchBar}>
                    <StoreLocationSearch isPopup={true} />
                </div>
                <StoresList
                    storeList={storeList}
                    storeListError={storeListError}
                    handleStoreSelect={handleStoreSelect}
                    onScroll={onStoreListScroll}
                    classes={{ root: classes.storesListRoot }}
                    outerAnchorRef={outerAnchorRef}
                    outerListRef={outerListRef}
                    isButtonLoading={isButtonLoading}
                />
                <span ref={outerAnchorRef} />
            </div>
            <footer className={classes.footer}>
                <Link to="/stores">
                    <Button
                        classes={{ primary: classes.finderButton }}
                        priority="high"
                        onClick={() => {
                            dispatch({
                                type: 'STORE_SELECTOR_VIEW_STORE_FINDER'
                            });
                        }}
                        onPress={onClose}
                    >
                        <FormattedMessage
                            id="storePopup.viewStoreFinder"
                            defaultMessage="View Store Finder"
                        />
                    </Button>
                </Link>
            </footer>
        </>
    );
};

StoreSelector.propTypes = {
    onClose: func.isRequired
};

export default StoreSelector;
