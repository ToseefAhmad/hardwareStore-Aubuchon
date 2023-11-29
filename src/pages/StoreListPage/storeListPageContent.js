import React from 'react';

import StoreLocationSearch from '@app/components/StoreLocationSearch';
import StoreMap from '@app/components/StoreMap';
import StoresList from '@app/components/StoresList';
import StoreListPageShimmer from '@app/pages/StoreListPage/storeListPage.shimmer';

import classes from './storeListPageContent.module.css';
import { useStoreListPageContent } from './useStoreListPageContent';

const StoreListPageContent = () => {
    const {
        storeList,
        storeListError,
        handleStoreSelect,
        isMobile,
        loading,
        isButtonLoading
    } = useStoreListPageContent();

    if (loading) {
        return <StoreListPageShimmer />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>Store Locator</div>
            <div className={classes.search}>
                <StoreLocationSearch />
            </div>
            <div className={classes.map}>
                {storeList.length > 0 && (
                    <StoreMap
                        locations={storeList}
                        locateOnInit={true}
                        isFullBleed={isMobile}
                    />
                )}
            </div>
            <div className={classes.list}>
                {storeList.length > 0 && (
                    <StoresList
                        storeList={storeList}
                        storeListError={storeListError}
                        handleStoreSelect={handleStoreSelect}
                        itemClasses={{
                            content: classes.content,
                            statusOpen: classes.statusOpen,
                            imageContainer: classes.imageContainer
                        }}
                        classes={{ root: classes.storesListRoot }}
                        isButtonLoading={isButtonLoading}
                    />
                )}
            </div>
        </div>
    );
};

export default StoreListPageContent;
