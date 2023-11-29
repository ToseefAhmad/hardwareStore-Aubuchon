import React, { useState } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { Accordion } from '@magento/venia-ui/lib/components/Accordion';

import { SnapSlider } from '@app/components/ReactSnapSlider';
import SnapSliderWithPagination from '@app/components/ReactSnapSlider/SnapSliderWithPagination';
import { useTailwindContext } from '@app/context/tailwind';
import StoreCard from '@app/pageBuilder/ContentTypes/OurLocalStoresSlider/StoreCard';
import { useOurLocalStoresSlider } from '@app/pageBuilder/ContentTypes/OurLocalStoresSlider/useOurLocalStoresSlider';
import StoreLinks from '@app/pages/SitemapPage/StoreLinks';
import { useSiteMapPage } from '@app/pages/SitemapPage/useSitemapPage';

import classes from './ourLocalStoresSlider.module.css';
import OurLocalStoresSliderShimmer from './ourLocalStoresSlider.shimmer';

const OurLocalStoresSlider = () => {
    const { data, loading } = useOurLocalStoresSlider();
    const storesData = data?.pickupStoreBrands;
    const { loadingStoreList, pageData } = useSiteMapPage();
    const { storeListData } = pageData;
    const [expanded, setExpanded] = useState(false);
    const firstElement = storesData?.[0]?.uid;
    const lastElement = storesData?.[storesData?.length - 1]?.uid;
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const mobileGap = isMobile ? 5 : 0;

    // Per designs we don't have slider with pagination but we needed it for better mobile experience
    const SliderComponent = isMobile ? SnapSliderWithPagination : SnapSlider;

    if (loading || loadingStoreList) {
        return <OurLocalStoresSliderShimmer />;
    }

    return (
        <section>
            <h5 className={classes.title}>Our Local Stores</h5>
            <div className={classes.borderLine} />
            <div className={classes.slider}>
                <SliderComponent
                    slidesGap={mobileGap}
                    threshold={1}
                    isLocalStoresSlider
                    isPaginationVisible={false}
                >
                    {storesData.map(store => (
                        <StoreCard
                            key={store.uid}
                            storeInfo={store}
                            isMobile={isMobile}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            firstElement={firstElement}
                            lastElement={lastElement}
                        />
                    ))}
                </SliderComponent>
            </div>
            <div className={classes.storeLinks}>
                <Accordion canOpenMultiple={true}>
                    <div
                        className={classes.container}
                        style={{
                            position: expanded ? 'initial' : 'relative'
                        }}
                    >
                        {storeListData &&
                            storeListData.map(child => {
                                return (
                                    <div
                                        key={child[0]}
                                        className={classes.categoryBlock}
                                    >
                                        <StoreLinks
                                            name={child[0]}
                                            items={child[1]}
                                            classes={{
                                                body: classes.bodyStoreIndex
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </Accordion>
            </div>
        </section>
    );
};

export default OurLocalStoresSlider;
