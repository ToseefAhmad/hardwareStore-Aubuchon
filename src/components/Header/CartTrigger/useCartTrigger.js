import { useQuery } from '@apollo/client';
import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import { APP_BRAND_AUBUCHON } from '@app/constants';
import { useBrandContext } from '@app/context/Brand';

const MINICART_MODAL_IDENTIFIER = 'minicart';

/**
 * Routes to hide the mini cart on.
 */
const DENIED_MINI_CART_ROUTES = ['/checkout'];

/**
 *
 * @param {DocumentNode} props.queries.getItemCountQuery query to get the total cart items count
 *
 * @returns {
 *      itemCount: Number,
 *      hideCartTrigger: Function,
 *      handleOpenMiniCart: Function
 *  }
 */
export const useCartTrigger = props => {
    const {
        queries: { getItemCountQuery }
    } = props;

    const [{ cartId }] = useCartContext();
    const [{ brand }] = useBrandContext();
    const location = useLocation();
    const [isHidden, setIsHidden] = useState(() =>
        DENIED_MINI_CART_ROUTES.includes(location.pathname)
    );
    const [isMobileTriggerExpanded, setIsMobileTriggerExpanded] = useState(
        false
    );
    const notInitialRender = useRef(false);
    const previousItemCount = useRef(0);

    const { data } = useQuery(getItemCountQuery, {
        fetchPolicy: 'cache-only',
        variables: {
            cartId
        },
        skip: !cartId,
        errorPolicy: 'all'
    });

    const [{ drawer }, { toggleDrawer }] = useAppContext();

    const handleOpenMiniCart = useCallback(() => {
        toggleDrawer(MINICART_MODAL_IDENTIFIER);
    }, [toggleDrawer]);

    const itemCount = data?.cart?.total_quantity || 0;

    useEffect(() => {
        setIsHidden(DENIED_MINI_CART_ROUTES.includes(location.pathname));
    }, [location]);

    useEffect(() => {
        if (notInitialRender.current && itemCount > previousItemCount.current) {
            previousItemCount.current = itemCount;
            setIsMobileTriggerExpanded(true);

            const timer = setTimeout(
                () => setIsMobileTriggerExpanded(false),
                3000
            );
            return () => {
                clearTimeout(timer);
            };
        }

        previousItemCount.current = itemCount;

        if (data) notInitialRender.current = true;
    }, [itemCount, data]);

    const isAubuchonBrand = useMemo(
        () => brand?.identifier === APP_BRAND_AUBUCHON,
        [brand]
    );

    return {
        itemCount,
        hideCartTrigger: isHidden,
        handleOpenMiniCart,
        isMobileTriggerExpanded,
        isAubuchonBrand,
        isOpen: drawer === MINICART_MODAL_IDENTIFIER
    };
};
