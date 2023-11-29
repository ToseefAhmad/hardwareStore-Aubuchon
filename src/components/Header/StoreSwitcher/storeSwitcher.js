import { bool, shape, string } from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    Store,
    StoreSmall,
    ChevronUpSmall,
    ChevronDown
} from '@app/components/Icons';
import StoreStatus from '@app/components/StoreComponents/Status';
import { useId } from '@app/hooks/useId';
import { useIsOrderPage } from '@app/hooks/useIsOrderPage';

import StoreSwitcherDropdown from './DropDown';
import dropdownTransitions from './dropdownTransitions.module.css';
import defaultClasses from './storeSwitcher.module.css';
import { useStoreSwitcher } from './useStoreSwitcher';

const StoreSwitcher = ({ classes: propsClasses, showMobileSwitcher }) => {
    const classes = useStyle(defaultClasses, propsClasses);
    const {
        elementRef,
        triggerRef,
        expanded,
        toggleExpanded,
        toggleStoreSwitcherDialog,
        dataIsLoaded,
        storeInfoData,
        storeOpenCloseData
    } = useStoreSwitcher();
    const { id } = useId();

    const [, { dispatch }] = useEventingContext();

    // To disable change store button when user or guest user is on Order's page
    const { isOrderPage } = useIsOrderPage();

    let content = (
        <Shimmer height={showMobileSwitcher ? '58px' : '100%'} width="100%" />
    );

    if (dataIsLoaded) {
        const {
            url_key,
            address,
            city,
            region_code,
            phone,
            imageSrc
        } = storeInfoData;
        const { isOpen, storeWorkInfo } = storeOpenCloseData;
        const storeName = `${city}, ${region_code}`;

        const headerView = (
            <>
                <button
                    className={classes.trigger}
                    onClick={toggleExpanded}
                    aria-expanded={expanded}
                    aria-haspopup="dialog"
                    aria-controls={expanded ? id`storeSwitcherHeader` : null}
                >
                    <div className={classes.icon}>
                        <Icon src={Store} />
                    </div>
                    <div className={classes.info}>
                        <p className={classes.name}>{storeName}</p>
                        <div className={classes.statusWrapper}>
                            <StoreStatus
                                isOpen={isOpen}
                                storeWorkInfo={storeWorkInfo}
                            />
                            <div className={classes.chevronIcon}>
                                <Icon
                                    src={
                                        expanded ? ChevronUpSmall : ChevronDown
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </button>
                <CSSTransition
                    in={expanded}
                    classNames={{ ...dropdownTransitions }}
                    timeout={150}
                    unmountOnExit
                >
                    <StoreSwitcherDropdown
                        ref={elementRef}
                        ariaIdentifier={id`storeSwitcherHeader`}
                        storeName={storeName}
                        urlKey={url_key}
                        address={address}
                        phone={phone}
                        imageSrc={imageSrc}
                        onChangeStorePress={toggleStoreSwitcherDialog}
                        toggleExpanded={toggleExpanded}
                    />
                </CSSTransition>
            </>
        );
        const bottomView = (
            <div
                className={`${classes.mobileTrigger} ${
                    classes.mobileTriggerButton
                }`}
            >
                <span className={classes.icon}>
                    <Icon src={StoreSmall} />
                </span>
                <span className={classes.info}>
                    <span className={classes.name}>
                        Pickup Store:{' '}
                        <strong className={classes.strong}>{storeName}</strong>
                    </span>
                    <StoreStatus
                        isOpen={isOpen}
                        storeWorkInfo={storeWorkInfo}
                    />
                </span>
                {!isOrderPage && (
                    <Button
                        className={classes.storeSwitcherButton}
                        onPress={() => {
                            toggleStoreSwitcherDialog();
                            dispatch({
                                type: 'STORE_CHANGE_CLICK'
                            });
                        }}
                    >
                        Change
                    </Button>
                )}
            </div>
        );

        content = !showMobileSwitcher ? headerView : bottomView;
    }

    return (
        <>
            <div ref={triggerRef} className={classes.root}>
                {content}
            </div>
        </>
    );
};

StoreSwitcher.propTypes = {
    classes: shape({
        root: string,
        trigger: string,
        mobileTrigger: string,
        icon: string,
        info: string,
        name: string,
        storeSwitcherButton: string
    }),
    showMobileSwitcher: bool
};

StoreSwitcher.defaultProps = {
    showMobileSwitcher: false
};

export default StoreSwitcher;
