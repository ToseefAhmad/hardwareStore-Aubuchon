import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import { Meta } from '@magento/venia-ui/lib/components/Head';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import CompanyRichSnippet from '@app/components/CompanyRichSnippet/companyRichSnippet';
import ErrorView from '@app/components/ErrorView';
import GoogleMaps from '@app/components/GoogleMaps';
import GoogleReviewsCarousel from '@app/components/GoogleReviewsCarousel';
import { Title } from '@app/components/Head';
import StoreDetails, {
    StoreDetailsShimmer
} from '@app/components/StoreDetails';
import StoreMap from '@app/components/StoreMap';
import { useTailwindContext } from '@app/context/tailwind';

import Breadcrumbs from './breadcrumbs';
import Managers from './Managers';
import ManagersShimmer from './Managers/managers.shimmer';
import Services from './Services';
import ServicesShimmer from './Services/services.shimmer';
import classes from './storeViewPage.module.css';
import { useStoreViewPage } from './useStoreViewPage';

const CheckBrowserCompatibility = React.lazy(() =>
    import('@app/components/CheckBrowserCompatibilty/checkBrowserCompatibilty')
);

const StoreViewPage = () => {
    const {
        storeName,
        storeData,
        isLoading,
        showMakeMyStoreButton,
        meta_title,
        meta_description
    } = useStoreViewPage();
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const { managers, tags: services } = storeData || {};

    if (!isLoading && !storeData) {
        return <ErrorView />;
    }

    return (
        <>
            <Title>{meta_title}</Title>
            <Meta name="title" content={meta_title} />
            <Meta name="description" content={meta_description} />
            <Breadcrumbs />
            <div className={classes.root}>
                <div className={classes.storeBlock}>
                    {!storeData && isLoading && (
                        <StoreDetailsShimmer isMobile={isMobile} />
                    )}
                    {storeData && Object.keys(storeData).length > 0 && (
                        <StoreDetails
                            name={storeName}
                            location={storeData}
                            showMakeMyStoreButton={showMakeMyStoreButton}
                        />
                    )}
                    {!isMobile && (
                        <>
                            {isLoading && !managers?.length > 0 && (
                                <ManagersShimmer />
                            )}
                            {managers?.length > 0 && (
                                <Managers
                                    managers={managers[0]}
                                    store={storeName}
                                />
                            )}
                        </>
                    )}
                </div>
                <div className={classes.mapBlock}>
                    <div className={classes.map}>
                        {isLoading && !storeData && (
                            <Shimmer
                                width="100%"
                                height="100%"
                                borderRadius={isMobile ? '0' : '5px'}
                            />
                        )}
                        {storeData && (
                            <GoogleMaps>
                                <StoreMap
                                    locations={[storeData]}
                                    draggable={false}
                                    showInfoWindow={!isMobile}
                                    infoIsOpened={true}
                                />
                            </GoogleMaps>
                        )}
                    </div>
                    {isMobile && (
                        <>
                            {isLoading && !managers?.length > 0 && (
                                <ManagersShimmer />
                            )}
                            {managers?.length > 0 && (
                                <Managers
                                    managers={managers[0]}
                                    store={storeName}
                                />
                            )}
                        </>
                    )}
                    {isLoading && !services?.length > 0 && (
                        <ServicesShimmer isMobile={isMobile} />
                    )}
                    {services?.length > 0 && <Services services={services} />}
                    <div className={classes.googleReview}>
                        <GoogleReviewsCarousel
                            showLoading={isLoading && !storeData}
                            pickupStoreId={storeData && storeData.id}
                            brandName={storeData && storeData.brand.name}
                            storeName={
                                storeData &&
                                `${storeData.city}, ${storeData.region_code}`
                            }
                            classes={{
                                arrowRoot: classes.arrows,
                                customerTitle: classes.customerTitle
                            }}
                            isStoreViewPage
                        />
                    </div>
                </div>
            </div>
            <CompanyRichSnippet />
            <CheckBrowserCompatibility />
        </>
    );
};

export default StoreViewPage;
