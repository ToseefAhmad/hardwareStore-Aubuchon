import { useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useMagentoRoute } from '@app/talons/MagentoRoute/useMagentoRoute';

export const useBottomNavigation = () => {
    const [{ areSearchSuggestionsShown }] = useAppContext();

    const routeParams = useMagentoRoute();
    const location = useLocation();

    const isPLPageOrPDPage =
        routeParams.type === 'PRODUCT' ||
        routeParams.type === 'CATEGORY' ||
        location.pathname === '/search';

    return {
        areSearchSuggestionsShown,
        isPLPageOrPDPage,
        isLoading: routeParams.isLoading
    };
};
