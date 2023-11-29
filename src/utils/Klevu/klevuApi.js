import {
    client as axiosClient,
    trackingClient as axiosTrackingClient,
    dashboardClient as axiosDashboardClient
} from './axiosConfig';

const getSearchData = async value => {
    const response = await axiosClient.get(`/cloud-search/n-search/search?`, {
        params: {
            ticket: KLEVU_API_KEY,
            analyticsApiKey: KLEVU_API_KEY,
            term: value,
            autoComplete: true,
            autoCompleteFilters: 'category:cms',
            paginationStartsFrom: 0,
            sortPrice: false,
            showOutOfStockProducts: false,
            klevuFetchPopularTerms: false,
            klevuSort: 'rel',
            klevu_filterLimit: 50,
            fetchMinMaxPrice: false,
            noOfResults: 6,
            visibility: 'search',
            responseType: 'json',
            resultForZero: 1
        }
    });

    const data = response.data;
    await axiosTrackingClient.get(`/n-search/search?`, {
        params: {
            klevu_apiKey: KLEVU_API_KEY,
            klevu_term: value,
            klevu_totalResults: data.meta.totalResultsFound,
            klevu_typeOfQuery: data.meta.typeOfQuery
        }
    });

    return data;
};

const trackSearchClick = payload => {
    if (payload.searchTerm) {
        return axiosTrackingClient.get(`/productTracking?`, {
            params: {
                klevu_apiKey: KLEVU_API_KEY,
                klevu_type: 'clicked',
                klevu_keywords: payload.searchTerm,
                klevu_productId: payload.id,
                klevu_productGroupId: payload.id,
                klevu_productVariantId: payload.id,
                klevu_productName: payload.name,
                klevu_productUrl: payload.url
            }
        });
    }
};

const getDefaultSearchData = () => {
    return axiosDashboardClient.get(`${KLEVU_API_KEY}.json`);
};

const getUrlRedirects = () => {
    return axiosDashboardClient.get(`${KLEVU_API_KEY}-maps.json`);
};

export default {
    getSearchData,
    trackSearchClick,
    getDefaultSearchData,
    getUrlRedirects
};
