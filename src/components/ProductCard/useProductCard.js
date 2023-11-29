import parse from 'html-react-parser';
import { useCallback, useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useTailwindContext } from '@app/context/tailwind';

/**
 * Parse ProductCardFragment data to props used for its components
 */
export const useProductCard = ({
    isTwoColumns,
    product,
    propsSize,
    storeConfig,
    configuredVariant
}) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();

    const handleToggleModal = useCallback(() => {
        toggleModal({
            identifier: `${MODAL_NAMES.checkNearbyStores}`,
            props: {
                sku: product?.sku
            }
        });
    }, [product?.sku, toggleModal]);

    const size =
        innerWidth >= screens.lg
            ? propsSize.desktop
            : isTwoColumns
            ? propsSize.twoColumns
            : propsSize.mobile;

    const isConfigurable = useMemo(
        () => product && isProductConfigurable(product),
        [product]
    );

    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;
    const productLink = useMemo(() => {
        if (!product) return;

        return resourceUrl(`/${product.url_key}${productUrlSuffix || ''}`);
    }, [productUrlSuffix, product]);

    const productFullUrl = useMemo(() => {
        return location.protocol + '//' + location.host + productLink;
    }, [productLink]);

    if (!product) {
        return {
            badge: '',
            id: '',
            imageUrl: '',
            name: '',
            price: {
                value: 0,
                currency: '',
                oldValue: 0
            },
            productType: '',
            qty: 0,
            rating: 0,
            size: {
                width: size.width,
                height: size.height,
                ratio: size.width / size.height
            },
            sku: '',
            url: '',
            pickupStoreInventory: {},
            isInStock: false,
            specialOrder: false,
            handleToggleModal: () => {}
        };
    }

    const prices = product.price_range?.maximum_price;
    const finalPrice = prices?.discount.amount_off
        ? prices.regular_price.value - prices.discount.amount_off
        : prices.final_price.value;
    const oldPrice = prices?.regular_price?.value;

    return {
        badge: finalPrice < oldPrice ? 'Sale' : '',
        id: product.id,
        imageUrl: product.small_image?.url || product.thumbnail?.url,
        name: parse(product.name),
        price: !isConfigurable
            ? {
                  value: finalPrice,
                  currency:
                      product.price_range?.maximum_price?.final_price?.currency,
                  oldValue: oldPrice
              }
            : {
                  max: product.price_range?.maximum_price?.final_price?.value,
                  currency:
                      product.price_range?.maximum_price?.final_price?.currency,
                  min: product.price_range?.minimum_price?.final_price?.value
              },
        units: product.paint_size_unit,
        productType: product.__typename,
        maxQty:
            configuredVariant?.pickup_store_inventory?.qty ??
            (product.pickup_store_inventory?.qty ||
                (product.pickup_store_inventory?.boss_eligible &&
                    product.pickup_store_inventory?.boss_qty)),
        rating: product.review_rating,
        size: {
            width: size.width,
            height: size.height,
            ratio: size.width / size.height
        },
        sku: product.sku,
        url: productLink,
        fullUrl: productFullUrl,
        pickupStoreInventory: product.pickup_store_inventory,
        isInStock: product.pickup_store_inventory?.qty > 0,
        specialOrder: product.pickup_store_inventory?.boss_available,
        handleToggleModal
    };
};
