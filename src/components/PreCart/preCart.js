import classnames from 'classnames';
import React, { useEffect } from 'react';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

import { useToasts, useWindowSize } from '@magento/peregrine';

import BonusRewards from '@app/components/BonusRewards';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import AddedItem from '@app/components/MiniCart/ProductList/item';
import { useCartContext } from '@app/context/cart';
import { useTailwindContext } from '@app/context/tailwind';
import { useId } from '@app/hooks/useId';

import classes from './precart.module.css';
import RelatedProducts from './RelatedProducts';
import { usePreCart } from './usePreCart';

const errorIcon = <Icon src={AlertCircleIcon} />;

const PreCart = () => {
    const {
        handleCloseMiniCart,
        isOpen,
        errorMessage,
        handleRemoveItem,
        handleUpdateItemQuantity,
        loading,
        productList,
        grandTotal,
        configurableThumbnailSource,
        storeUrlSuffix,
        storeConfig,
        handleNavigateToMiniCart
    } = usePreCart();

    const { id } = useId({ prefix: 'precart' });
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;
    const isCartEmpty = !(productList && productList.length);

    const [, { addToast }] = useToasts();
    const [{ lastAddedCartItem }] = useCartContext();
    const isLastAddedCartItem =
        lastAddedCartItem && Object.keys(lastAddedCartItem).length > 0;

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, errorMessage]);

    return (
        <>
            <div
                className={classnames({
                    [classes.root]: !isOpen,
                    [classes.root_open]: isOpen
                })}
                id="precart"
                role="dialog"
                aria-modal={true}
                aria-labelledby={id`title`}
            >
                <div className={classes.contents}>
                    <div className={classes.headingWrapper}>
                        <h3 id={id`title`}>Added to Cart</h3>
                        <button
                            className={classes.closeButton}
                            onClick={handleCloseMiniCart}
                            aria-label="Close minicart"
                        >
                            <Icon src={CloseIcon} />
                        </button>
                    </div>
                    <div className={classes.body}>
                        {isLastAddedCartItem && (
                            <AddedItem
                                classes={{
                                    root: isMobile
                                        ? classes.itemRootMobile
                                        : classes.itemRoot,
                                    details: classes.itemDetails,
                                    deleteButton: classes.itemDeleteButton,
                                    productCardImageContainer: isMobile
                                        ? classes.itemProductCardImageContainerMobile
                                        : classes.itemProductCardImageContainer
                                }}
                                {...lastAddedCartItem}
                                loading={loading}
                                closeMiniCart={handleCloseMiniCart}
                                handleRemoveItem={handleRemoveItem}
                                handleUpdateItemQuantity={
                                    handleUpdateItemQuantity
                                }
                                configurableThumbnailSource={
                                    configurableThumbnailSource
                                }
                                storeUrlSuffix={storeUrlSuffix}
                                storeConfig={storeConfig}
                                quantityIsVisible={isMobile}
                                productTypeLocation="lastAdded"
                            />
                        )}
                    </div>
                    {isLastAddedCartItem &&
                        lastAddedCartItem.product.__typename !==
                            'ConfigurableProduct' && (
                            <RelatedProducts
                                urlKey={lastAddedCartItem.product.url_key}
                            />
                        )}
                    <div className={classes.footer}>
                        {!isCartEmpty && (
                            <div className={classes.footerContents}>
                                <BonusRewards grandTotal={grandTotal?.value} />
                                <div className={classes.buttonsWrapper}>
                                    <Button
                                        onClick={handleNavigateToMiniCart}
                                        priority="high"
                                    >
                                        View Cart & Checkout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreCart;
