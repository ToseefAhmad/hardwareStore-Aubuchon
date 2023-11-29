import React from 'react';

import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import GoogleMaps from '@app/components/GoogleMaps';
import StoreDetails, {
    StoreDetailsShimmer
} from '@app/components/StoreDetails';
import StoreMap from '@app/components/StoreMap';
import TurnTo from '@app/components/TurnTo';
import WunderkindTag from '@app/components/WunderkindTag';
import { useBrandContext } from '@app/context/Brand';

import classes from './checkoutSuccessPage.module.css';
import InfoBlock from './InfoBlock';
import { useCheckoutSuccessPage } from './useCheckoutSuccessPage';

const CheckoutSuccessPage = () => {
    const {
        storeData,
        dataIsLoaded,
        isMobile,
        orderData
    } = useCheckoutSuccessPage();

    const [{ brand }] = useBrandContext();

    if (!orderData) {
        return fullPageLoadingIndicator;
    }

    const title = (
        <h1 className={classes.header}>
            Thank you for ordering from{' '}
            <strong className={classes.storeName}>
                {isMobile ? brand?.identifier : brand?.name}{' '}
            </strong>
        </h1>
    );

    return (
        <>
            <StoreTitle>Checkout Success</StoreTitle>
            <div className={classes.root}>
                {!storeData ||
                    (!Object.keys(storeData).length && (
                        <StoreDetailsShimmer isMobile={isMobile} />
                    ))}
                {storeData && Object.keys(storeData).length > 0 && (
                    <StoreDetails
                        location={storeData}
                        showTitle={isMobile}
                        titleNode={title}
                    >
                        {isMobile && <InfoBlock orderData={orderData} />}
                    </StoreDetails>
                )}
                {!isMobile && (
                    <InfoBlock
                        titleNode={title}
                        showTitle={true}
                        orderData={orderData}
                    />
                )}
            </div>
            <div className={classes.map}>
                {!dataIsLoaded && !storeData && (
                    <Shimmer width="100%" height="100%" />
                )}
                {storeData && (
                    <GoogleMaps>
                        <StoreMap
                            locations={[storeData]}
                            zoomControl={false}
                            draggable={false}
                            isFullBleed={true}
                            infoIsOpened={true}
                        />
                    </GoogleMaps>
                )}
            </div>
            <WunderkindTag orderData={orderData} />
            <TurnTo orderData={orderData} />
        </>
    );
};

export default CheckoutSuccessPage;
