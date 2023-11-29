import classnames from 'classnames';
import {
    array,
    func,
    object,
    shape,
    string,
    instanceOf,
    bool
} from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import StoresItem from '@app/components/StoresItem';
import { useStoresList } from '@app/hooks/useStoresList';

import classes from './storesList.module.css';

const StoresList = ({
    storeList,
    storeListError,
    handleStoreSelect,
    itemClasses,
    classes: propsClasses,
    onScroll,
    outerAnchorRef,
    outerListRef,
    isButtonLoading
}) => {
    const {
        listRef,
        currentStoreId,
        visibleItemsData,
        lastChildrenRef
    } = useStoresList({
        storeList,
        onScroll,
        outerAnchorRef,
        outerListRef
    });
    let content = null;

    if (storeListError) {
        content = (
            <li>
                <FormattedMessage
                    id="storesList.errorTryAgain"
                    defaultMessage="Something went wrong. Please refresh and try again."
                />
            </li>
        );
    } else if (visibleItemsData.length) {
        content = (
            <>
                {visibleItemsData.map((storeData, index) => (
                    <StoresItem
                        key={storeData.id}
                        data={storeData}
                        isCurrentStore={currentStoreId === storeData.id}
                        onSelectStore={() => {
                            handleStoreSelect(storeData);
                        }}
                        ref={
                            index === visibleItemsData.length - 1 &&
                            !outerAnchorRef
                                ? lastChildrenRef
                                : null
                        }
                        classes={itemClasses}
                        isButtonLoading={isButtonLoading}
                    />
                ))}
            </>
        );
    }

    return (
        <ul
            ref={listRef}
            className={classnames(classes.root, propsClasses?.root)}
        >
            {content}
        </ul>
    );
};

StoresList.propTypes = {
    storeList: array,
    storeListError: object,
    handleStoreSelect: func,
    classes: shape({
        root: string
    }),
    itemClasses: shape({
        content: string,
        statusOpen: string,
        imageContainer: string
    }),
    onScroll: func,
    outerAnchorRef: shape({ current: instanceOf(Element) }),
    outerListRef: shape({ current: instanceOf(Element) }),
    isButtonLoading: bool
};

StoresList.defaultProps = {
    handleStoreSelect: () => undefined,
    isButtonLoading: false
};

export default StoresList;
