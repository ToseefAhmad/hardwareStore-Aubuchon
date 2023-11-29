import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useToasts } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { isSupportedProductType as isSupported } from '@magento/peregrine/lib/util/isSupportedProductType';

import {
    UPDATE_QUANTITY_MUTATION,
    MINI_CART_QUERY
} from '@app/components/MiniCart/miniCart.gql';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import {
    adjustErrorMessageForToast,
    errorEventTypesToMap
} from '@app/components/ToastContainer';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useAddToCartSession } from '@app/hooks/useLogRocket';
import { smoothScroll } from '@app/utils/smooth-scroll';

import operations from './productFullDetail.gql';

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();
const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!isProductConfigurable(product) || !product.configurable_options) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attribute_id,
        attribute_code
    } of product.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }

    return initialOptionCodes;
};

// Similar to deriving the initial codes for each option.
const deriveOptionSelectionsFromProduct = product => {
    if (!isProductConfigurable(product) || !product.configurable_options) {
        return INITIAL_OPTION_SELECTIONS;
    }

    const initialOptionSelections = new Map();
    for (const { attribute_id } of product.configurable_options) {
        initialOptionSelections.set(attribute_id, undefined);
    }

    return initialOptionSelections;
};

const getIsMissingOptions = (product, optionSelections) => {
    // Non-configurable products can't be missing options.
    if (!isProductConfigurable(product) || !product.configurable_options) {
        return false;
    }

    // Configurable products are missing options if we have fewer
    // option selections than the product has options.
    const { configurable_options } = product;
    const numProductOptions = configurable_options.length;
    const numProductSelections = Array.from(optionSelections.values()).filter(
        value => !!value
    ).length;

    return numProductSelections < numProductOptions;
};

const getIsOutOfStock = (product, optionCodes, optionSelections) => {
    const { stock_status, variants } = product;
    const isConfigurable = isProductConfigurable(product);
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (isConfigurable && optionsSelected) {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        return item.product.stock_status === OUT_OF_STOCK_CODE;
    }
    return stock_status === OUT_OF_STOCK_CODE;
};

const getMediaGallery = (product, optionCodes, optionSelections) => {
    let value = [];

    const { media_gallery, variants } = product;
    const isConfigurable = isProductConfigurable(product);

    // Selections are initialized to "code => undefined". Once we select a value, like color, the selections change. This filters out unselected options.
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (!isConfigurable || !optionsSelected) {
        value = media_gallery;
    } else {
        // If any of the possible variants matches the selection add that
        // variant's image to the media gallery. NOTE: This _can_, and does,
        // include variants such as size. If Magento is configured to display
        // an image for a size attribute, it will render that image.
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        value = item
            ? [...item.product.media_gallery, ...media_gallery]
            : media_gallery;
    }

    return value;
};

// We only want to display breadcrumbs for one category on a PDP even if a
// product has multiple related categories. This function filters and selects
// one category id for that purpose.
const getBreadcrumbCategoryId = categories => {
    // Exit if there are no categories for this product.
    if (!categories || !categories.length) {
        return;
    }
    const breadcrumbSet = new Set();
    categories.forEach(({ breadcrumbs }) => {
        // breadcrumbs can be `null`...
        (breadcrumbs || []).forEach(({ category_uid }) =>
            breadcrumbSet.add(category_uid)
        );
    });

    // Until we can get the single canonical breadcrumb path to a product we
    // will just return the first category id of the potential leaf categories.
    const leafCategory = categories.find(
        category => !breadcrumbSet.has(category.uid)
    );

    // If we couldn't find a leaf category then just use the first category
    // in the list for this product.
    return leafCategory.uid || categories[0].uid;
};

const getCustomAttributes = (product, optionCodes, optionSelections) => {
    const { custom_attributes, variants } = product;
    const isConfigurable = isProductConfigurable(product);
    const optionsSelected =
        Array.from(optionSelections.values()).filter(value => !!value).length >
        0;

    if (isConfigurable && optionsSelected) {
        const item = findMatchingVariant({
            optionCodes,
            optionSelections,
            variants
        });

        return item.product.custom_attributes;
    }

    return custom_attributes;
};

export const useProductFullDetail = ({ product, isMobile }) => {
    const [
        { drawer },
        {
            actions: { toggleModal },
            toggleDrawer
        }
    ] = useAppContext();

    const productType = product.__typename;

    const isSupportedProductType = isSupported(productType);

    const [, { addToast }] = useToasts();

    const [, { dispatch }] = useEventingContext();

    const { initAddToCartSession: initLogRocket } = useAddToCartSession();

    const location = useLocation();

    const [{ city, allow_pickup }] = usePickupStoreContext();
    const [
        { cartId, createCart },
        {
            actions: { addLastCartItem }
        }
    ] = useCartContext();
    const isConfigurable = useMemo(() => isProductConfigurable(product), [
        product
    ]);

    const handleImageZoomOpenModal = useCallback(() => {
        toggleModal({
            identifier: 'mobileZoom'
        });
    }, [toggleModal]);

    const handleImageZoomCloseModal = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const [isQuantityInputExpanded, setIsQuantityInputExpanded] = useState(
        false
    );
    const [selectedColor, setSelectedColor] = useState({});

    const [
        addProductToCart,
        { error: errorAddingProductToCart, loading: isAddProductLoading }
    ] = useMutation(operations.addProductToCartMutation);

    const [
        updateQuantity,
        { error: errorUpdatingQuantity, loading: isUpdateQuantityLoading }
    ] = useMutation(UPDATE_QUANTITY_MUTATION);

    const { data: miniCartData } = useQuery(MINI_CART_QUERY, {
        variables: { cartId },
        skip: !cartId
    });

    const breadcrumbCategoryId = useMemo(
        () => getBreadcrumbCategoryId(product.categories),
        [product.categories]
    );

    const brandCategoryInformation = useMemo(() => {
        if (product.brand === '' || !product.brand || !product.categories) {
            return null;
        }
        return product.categories.find(
            category => category.name === product.brand
        );
    }, [product.brand, product.categories]);

    const derivedOptionSelections = useMemo(
        () => deriveOptionSelectionsFromProduct(product),
        [product]
    );

    const [optionSelections, setOptionSelections] = useState(
        derivedOptionSelections
    );

    const optionCodes = useMemo(() => deriveOptionCodesFromProduct(product), [
        product
    ]);

    const isMissingOptions = useMemo(
        () => getIsMissingOptions(product, optionSelections),
        [product, optionSelections]
    );

    const isOutOfStock = useMemo(
        () => getIsOutOfStock(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const mediaGallery = useMemo(
        () => getMediaGallery(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    const customAttributes = useMemo(
        () => getCustomAttributes(product, optionCodes, optionSelections),
        [product, optionCodes, optionSelections]
    );

    // The map of ids to values (and their uids)
    // For example:
    // { "179" => [{ uid: "abc", value_index: 1 }, { uid: "def", value_index: 2 }]}
    const attributeIdToValuesMap = useMemo(() => {
        const map = new Map();
        // For simple items, this will be an empty map.
        const options = product.configurable_options || [];
        for (const { attribute_id, values } of options) {
            map.set(attribute_id, values);
        }
        return map;
    }, [product.configurable_options]);

    // An array of selected option uids. Useful for passing to mutations.
    // For example:
    // ["abc", "def"]
    const selectedOptionsArray = useMemo(() => {
        const selectedOptions = [];

        optionSelections.forEach((value, key) => {
            const values = attributeIdToValuesMap.get(key);

            const selectedValue = values.find(
                item => item.value_index === value
            );

            if (selectedValue) {
                selectedOptions.push(selectedValue.uid);
            }
        });
        return selectedOptions;
    }, [attributeIdToValuesMap, optionSelections]);

    const handleSelectionChange = useCallback(
        (optionId, selection) => {
            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [optionSelections]
    );

    // Returns a cart item that handles current viewed product
    const cartItem = useMemo(() => {
        const cartItem = miniCartData?.cart?.items.find(
            item => item.product.uid === product.uid
        );

        setIsQuantityInputExpanded(!!cartItem);

        return cartItem;
    }, [product, miniCartData]);

    // Updates quantity of current viewed product in the cart (for mobile)
    const handleUpdateItemQuantity = useCallback(
        async (quantity, status) => {
            try {
                if (quantity === 0) {
                    dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: {
                            currencyCode:
                                miniCartData?.cart?.prices?.grand_total
                                    ?.currency,
                            items: [cartItem]
                        }
                    });
                }
                const {
                    data: { updateCartItems }
                } = await updateQuantity({
                    variables: {
                        cartId,
                        itemId: cartItem.uid,
                        quantity
                    }
                });

                if (quantity !== 0 && drawer !== 'precart') {
                    const lastAddedProduct = updateCartItems.cart.items.find(
                        product => product.uid === cartItem.uid
                    );
                    addLastCartItem.receive(lastAddedProduct);
                    if (status === 'increment') {
                        toggleDrawer('precart');
                    }
                }
            } catch (error) {
                // Mutation errors are handled with toasts
            }
        },
        [
            updateQuantity,
            cartId,
            cartItem,
            miniCartData?.cart?.prices?.grand_total?.currency,
            dispatch,
            toggleDrawer,
            addLastCartItem,
            drawer
        ]
    );

    const maxAvailableQuantity = useMemo(() => {
        const bopisAvailableQty = product.pickup_store_inventory?.qty;
        const bossAvailableQty = product.pickup_store_inventory?.boss_eligible
            ? product.pickup_store_inventory.boss_qty
            : 0;

        if (bopisAvailableQty > 0) {
            return bopisAvailableQty;
        }

        if (bossAvailableQty > 0) {
            return bossAvailableQty;
        }

        return 0;
    }, [product]);

    const availableQuantity = useMemo(() => {
        const reservedQty = cartItem?.quantity || 0;

        return Math.max(maxAvailableQuantity - reservedQty, 0);
    }, [maxAvailableQuantity, cartItem]);

    const handleAddToCart = useCallback(
        async formValues => {
            try {
                initLogRocket();
            } catch (e) {
                console.error(e);
            }

            const isAvailableQuantityExceeded =
                formValues.quantity > availableQuantity;

            if (isAvailableQuantityExceeded && availableQuantity === 0) {
                addToast({
                    type: 'error',
                    message: `You already have maximum available amount of items in your cart`
                });

                return;
            }

            const adjustedQuantity = isAvailableQuantityExceeded
                ? availableQuantity
                : formValues.quantity;

            const quantity = isMobile ? 1 : adjustedQuantity;

            const currentCartId = cartId || (await createCart());
            const variables = {
                cartId: currentCartId,
                product: {
                    sku: product.sku,
                    quantity
                },
                entered_options: [
                    {
                        uid: product.uid,
                        value: product.name
                    }
                ]
            };

            if (selectedOptionsArray.length) {
                variables.product.selected_options = selectedOptionsArray;
            }

            try {
                const { data: addToCartResult } = await addProductToCart({
                    variables
                });

                if (isAvailableQuantityExceeded) {
                    addToast({
                        type: 'warning',
                        message: `Requested quantity is not available. Added ${quantity} items instead.`
                    });
                }

                dispatch({
                    type: 'ADD_TO_CART',
                    payload: {
                        ...addToCartResult.addProductsToCart.cart,
                        added: {
                            ...product,
                            quantity
                        }
                    }
                });
                if (drawer !== 'precart') {
                    const lastAddedProduct = addToCartResult.addProductsToCart.cart.items.find(
                        item => item.product.uid === product.uid
                    );
                    addLastCartItem.receive(lastAddedProduct);
                    toggleDrawer('precart');
                }
            } catch {
                // Mutation errors are handled with toasts
            }
        },
        [
            addProductToCart,
            addToast,
            availableQuantity,
            cartId,
            dispatch,
            initLogRocket,
            isMobile,
            product,
            selectedOptionsArray,
            createCart,
            drawer,
            toggleDrawer,
            addLastCartItem
        ]
    );

    const productPrice = useMemo(() => {
        const isConfigurable = isProductConfigurable(product);

        if (!isConfigurable && product.price_range) {
            const {
                discount,
                regular_price: regularPrice,
                final_price: finalPrice
            } = product.price_range.maximum_price;
            return discount.amount_off
                ? regularPrice.value - discount.amount_off
                : finalPrice.value;
        }

        return undefined;
    }, [product]);

    const isBossProduct =
        product.pickup_store_inventory?.qty <= 0 &&
        product.pickup_store_inventory.boss_eligible;

    const isDiscount = useMemo(() => {
        return (
            !isConfigurable &&
            product.price_range?.maximum_price.discount.amount_off > 0
        );
    }, [product, isConfigurable]);

    // Normalization object for product details we need for rendering.
    const productDetails = {
        description: product.description,
        name: product.name,
        regularSimpleProductPrice:
            product.price_range?.maximum_price.regular_price.value,
        price: productPrice,
        currency: product.price_range?.maximum_price.final_price.currency,
        sku: product.sku,
        brand: product.brand,
        reviewCount: product.review_count,
        reviewRating: product.review_rating,
        quantity: cartItem?.quantity,
        smallImage: product.small_image,
        specifications: product.specification_attributes,
        maxQty: maxAvailableQuantity,
        availableQuantity,
        relatedProducts: product.related_products
    };

    const derivedErrorMessage = useMemo(
        () =>
            deriveErrorMessage([
                errorAddingProductToCart,
                errorUpdatingQuantity
            ]),
        [errorAddingProductToCart, errorUpdatingQuantity]
    );

    const onCheckNearbyStoresClick = useCallback(() => {
        toggleModal({
            identifier: `${MODAL_NAMES.checkNearbyStores}`,
            props: {
                sku: product?.sku
            }
        });
    }, [product?.sku, toggleModal]);

    // Handle star rating onClick scroll to review tab
    const reviewTabRef = useRef();
    const handleRatingClick = useCallback(
        e => {
            e.preventDefault();

            if (!reviewTabRef.current) {
                return;
            }

            reviewTab.click();
            smoothScroll({
                to: {
                    y:
                        reviewTab.getBoundingClientRect().top -
                        (isMobile ? 0 : 170)
                },
                duration: 300
            });
        },
        [isMobile]
    );

    useEffect(() => {
        if (derivedErrorMessage) {
            const message = adjustErrorMessageForToast({
                message: derivedErrorMessage,
                eventType: errorEventTypesToMap.ADD_OR_UPDATE_CART_ITEM
            });

            addToast({
                type: 'error',
                message
            });
        }
    }, [derivedErrorMessage, addToast]);

    const isFromTurnTo = useMemo(() => {
        return location.search.includes('turntoflow=review');
    }, [location.search]);

    useEffect(() => {
        if (isFromTurnTo) {
            toggleModal({
                identifier: MODAL_NAMES.writeReview
            });
        }
    }, [isFromTurnTo, toggleModal]);

    return {
        breadcrumbCategoryId,
        handleAddToCart,
        handleSelectionChange,
        handleUpdateItemQuantity,
        isInventoryLoaded: !!product.pickup_store_inventory,
        isOutOfStock,
        isAddToCartDisabled: !allow_pickup || isOutOfStock || isMissingOptions,
        isAddProductLoading,
        isUpdateQuantityLoading,
        isSupportedProductType,
        isQuantityInputExpanded,
        isDiscount,
        mediaGallery,
        productDetails,
        customAttributes,
        selectedColor,
        setSelectedColor,
        optionSelections,
        isConfigurable,
        city,
        onCheckNearbyStoresClick,
        isBossProduct,
        brandCategoryInformation,
        reviewTabRef,
        handleRatingClick,
        handleImageZoomOpenModal,
        handleImageZoomCloseModal,
        isFromTurnTo
    };
};
