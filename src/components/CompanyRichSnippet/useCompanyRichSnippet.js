import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useBrandContext } from '@app/context/Brand';

import operations from './companyRichSnippet.gql';
import { getOpeningAndSpecialHours } from './helpers';

const socialLinks = [
    'https://www.youtube.com/user/aubuchonhardware',
    'https://www.facebook.com/aubuchonhardware/',
    'https://www.instagram.com/aubuchonhardware/',
    'https://twitter.com/aubuchonhrdware'
];

export const useCompanyRichSnippet = () => {
    const [, { getBrandFromList }] = useBrandContext();
    const { urlKey } = useParams();

    const {
        queries: { getStoresListQuery }
    } = operations;

    const { data: storesListData } = useQuery(getStoresListQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    // Finds the main store with store_number
    const mainStore = useMemo(() => {
        return (
            storesListData?.pickupStoreList &&
            storesListData.pickupStoreList.find(
                store => store.url_key === urlKey
            )
        );
    }, [storesListData, urlKey]);

    const businessLocationsStructuredData = useMemo(() => {
        if (mainStore) {
            const mainStoreBrand = getBrandFromList(mainStore.brand?.uid);
            const { openingHours, specialDays } = getOpeningAndSpecialHours(
                mainStore
            );

            return {
                '@context': 'https://www.schema.org/',
                '@type': 'HardwareStore',
                name: mainStoreBrand.name,
                url: `https://hardwarestore.com/stores/${mainStore.url_key}`,
                '@id': `https://hardwarestore.com/stores/${mainStore.url_key}`,
                logo: mainStoreBrand.logo,
                image: mainStore.images && mainStore.images[0],
                priceRange: '$$',
                telephone: mainStore.phone,
                email: mainStore.email,
                sameAs: socialLinks,
                openingHoursSpecification: openingHours,
                specialOpeningHoursSpecification: specialDays,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: mainStore.address,
                    addressLocality: mainStore.city,
                    addressRegion: mainStore.region_code,
                    postalCode: mainStore.zipcode,
                    addressCountry: 'USA'
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: mainStore.latitude,
                    longitude: mainStore.longitude
                }
            };
        }
    }, [getBrandFromList, mainStore]);

    return {
        businessLocationsStructuredData
    };
};
