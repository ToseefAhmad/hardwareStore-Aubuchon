import classnames from 'classnames';
import { Form } from 'informed';
import { arrayOf, bool, number, shape, string, object } from 'prop-types';
import React, { Suspense, useRef } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Breadcrumbs from '@app/components/Breadcrumbs';
import BreadcrumbsShimmer from '@app/components/Breadcrumbs/breadcrumbs.shimmer';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Cart as CartIcon, ZoomIn } from '@app/components/Icons';
import ResultZoom from '@app/components/ImageZoom/resultZoom';
import { useImageZoom } from '@app/components/ImageZoom/useImageZoom';
import Link from '@app/components/Link';
import { QuantityFields } from '@app/components/MiniCart/ProductList/quantity';
import Price from '@app/components/Price';
import ProductAvailabilityPDP from '@app/components/ProductAvailabilityPDP';
import Carousel from '@app/components/ProductImageCarousel';
import { ProductOptionsShimmer } from '@app/components/ProductOptions';
import { OptionsContext } from '@app/components/ProductOptions/optionsContext';
import RichContent from '@app/components/RichContent';
import { Tabs, Tab } from '@app/components/Tabs';

import classes from './productFullDetail.module.css';
import QATab from './QATab';
import RatingStars from './RatingStars';
import RelatedProducts from './RelatedProducts';
import ReviewsTab from './ReviewsTab';
import { useProductFullDetail } from './useProductFullDetail';
import ZoomImageModal from './ZoomImageModal';

const Options = React.lazy(() => import('@app/components/ProductOptions'));

const ProductFullDetail = props => {
    const { product, storeConfig, isMobile, isDesktop } = props;

    const windowSize = useWindowSize();
    const isLargeDesktop = windowSize.innerWidth >= 1690;
    const mainImageRef = useRef();
    const titleRef = useRef();

    const {
        breadcrumbCategoryId,
        handleUpdateItemQuantity,
        handleAddToCart,
        isInventoryLoaded,
        isOutOfStock,
        isAddToCartDisabled,
        isUpdateQuantityLoading,
        isAddProductLoading,
        isSupportedProductType,
        isQuantityInputExpanded,
        isDiscount,
        mediaGallery,
        productDetails,
        handleSelectionChange,
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
    } = useProductFullDetail({
        product,
        isMobile
    });
    const isInCart = productDetails.quantity > 0;

    const {
        imageRef,
        resultRef,
        lensRef,
        moveLens,
        setZooming,
        zooming
    } = useImageZoom();

    const imageCarouselClassName = !isDesktop
        ? classes.imageCarouselMobile
        : classes.imageCarousel;

    const quantityFieldClassesOption = {
        root: classes.quantityRootOption,
        input: classes.quantityInputOption,
        button_decrement: classes.quantityButtonOption_decrement,
        button_increment: classes.quantityButtonOption_increment
    };

    const quantityFieldClasses = {
        root: classes.quantityRoot,
        input: classes.quantityInput,
        button_decrement: classes.quantityButton_decrement,
        button_increment: classes.quantityButton_increment
    };

    const isConfigurableProduct = isProductConfigurable(product);
    const options = isConfigurableProduct && (
        <>
            {product.configurable_options ? (
                <Suspense fallback={<ProductOptionsShimmer />}>
                    <OptionsContext.Provider
                        value={{
                            product,
                            color: selectedColor,
                            optionSelections
                        }}
                    >
                        <Options
                            onSelectionChange={handleSelectionChange}
                            setSelectedColor={setSelectedColor}
                            options={product.configurable_options}
                        />
                    </OptionsContext.Provider>
                </Suspense>
            ) : (
                <ProductOptionsShimmer />
            )}
        </>
    );

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : (
        <BreadcrumbsShimmer isMobile={isMobile} />
    );

    const cartCallToActionText = !isOutOfStock ? (
        <>
            <Icon src={CartIcon} />
            <span>{isMobile ? 'Add' : 'Add to cart'}</span>
        </>
    ) : (
        'Out of Stock'
    );

    const cartActionContent = (
        <Button
            classes={{ content: classes.addButtonContent }}
            disabled={
                !isInventoryLoaded ||
                isAddToCartDisabled ||
                !isSupportedProductType
            }
            isLoading={isAddProductLoading}
            priority="high"
            type="submit"
            isShort={isMobile}
        >
            {cartCallToActionText}
        </Button>
    );

    // Show add to cart button or quantity selector on mobile
    const mobileActions = isQuantityInputExpanded ? (
        <div className={classes.quantity}>
            <QuantityFields
                classes={
                    isInCart ? quantityFieldClassesOption : quantityFieldClasses
                }
                initialValue={productDetails.quantity}
                min={1}
                max={productDetails.maxQty || undefined}
                onChange={handleUpdateItemQuantity}
                loading={isUpdateQuantityLoading}
                disabled={!isInventoryLoaded}
            />
        </div>
    ) : (
        <div className={classes.actions}>{cartActionContent}</div>
    );

    const desktopActions = (
        <>
            <div className={classes.quantity}>
                <QuantityFields
                    key={productDetails.availableQuantity}
                    classes={quantityFieldClasses}
                    min={1}
                    max={Math.max(productDetails.availableQuantity, 1)}
                    disabled={!isInventoryLoaded}
                />
            </div>
            <div className={classes.actions}>{cartActionContent}</div>
        </>
    );

    // Show discounted price along with the regular price if there is discount
    const prices = (
        <div className={classes.pricesWrapper}>
            {!isNaN(productDetails.price) ? (
                <>
                    <span
                        className={classnames({
                            [classes.regularPrice]: !isDiscount,
                            [classes.discountedPrice]: isDiscount
                        })}
                    >
                        <Price
                            classes={{ currency: classes.currency }}
                            currencyCode={productDetails.currency}
                            value={productDetails.price}
                        />
                    </span>
                    {isDiscount && (
                        <span className={classes.crossedPrice}>
                            <Price
                                classes={{ currency: classes.currency }}
                                currencyCode={productDetails.currency}
                                value={productDetails.regularSimpleProductPrice}
                            />
                        </span>
                    )}
                </>
            ) : (
                <Shimmer width="100px" height="42px" />
            )}
        </div>
    );

    const productInfo = (
        <div
            className={
                isBossProduct
                    ? classes.availableInfoBoss
                    : classes.availableInfo
            }
        >
            {city ? (
                <p className={classes.storeName}>{city} Store</p>
            ) : (
                <div className={classes.storeNameShimmer}>
                    <Shimmer width="100%" height="100%" />
                </div>
            )}
            {product.pickup_store_inventory ? (
                <ProductAvailabilityPDP
                    data={product.pickup_store_inventory}
                    isCheckNearbyStores={true}
                    categories={product.categories}
                    onCheckNearbyStoresClick={onCheckNearbyStoresClick}
                    productType={product.__typename}
                />
            ) : (
                <Shimmer width="50%" height="26px" />
            )}
        </div>
    );

    // Price, SKU, Reviews, Quantity, Title and call to action block
    const brandClassName = productDetails.reviewRating
        ? classes.brandWithDivider
        : classes.brand;
    const mainInfo = (
        <>
            <div className={classes.topInfoBlock}>
                <span className={classes.sku}>SKU: {productDetails.sku}</span>
                <span className={brandClassName}>
                    {brandCategoryInformation?.url_path ? (
                        <Link to={brandCategoryInformation.url_path}>
                            {productDetails.brand}
                        </Link>
                    ) : (
                        productDetails.brand
                    )}
                </span>
                {!!productDetails.reviewRating && (
                    <button onClick={handleRatingClick}>
                        <RatingStars
                            rating={productDetails.reviewRating}
                            reviewCount={productDetails.reviewCount}
                        />
                    </button>
                )}
            </div>
            <div ref={titleRef} className={classes.title}>
                <h1>{productDetails.name}</h1>
            </div>
            {options}
            {!isMobile && !isConfigurable && (
                <>
                    {prices}
                    {productInfo}
                </>
            )}
            {!isConfigurable && (
                <>
                    {isMobile && (
                        <>
                            <div
                                className={classnames({
                                    [classes.addToCartWrapperOption]: isInCart,
                                    [classes.addToCartWrapper]: !isInCart
                                })}
                            >
                                {prices}
                                {mobileActions}
                            </div>
                            {productInfo}
                        </>
                    )}
                    {isDesktop && (
                        <>
                            {isInCart && (
                                <div className={classes.addedPriceWrapper}>
                                    {mobileActions}
                                </div>
                            )}
                            {!isInCart && (
                                <div className={classes.addToCartWrapper}>
                                    {desktopActions}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );

    const specificationItems = productDetails.specifications
        ? productDetails.specifications.map(item => (
              <li className={classes.specificationsItem} key={item.code}>
                  {item.label}:{' '}
                  <span className={classes.specificationsItemValue}>
                      {item.value}
                  </span>
              </li>
          ))
        : null;

    return (
        <>
            {!isMobile && breadcrumbs}
            <div className={classes.root}>
                <ZoomImageModal
                    handleCloseModal={handleImageZoomCloseModal}
                    productName={productDetails.name}
                    mediaGallery={
                        isConfigurableProduct && mediaGallery.length > 1
                            ? mediaGallery.slice(0, 1)
                            : mediaGallery
                    }
                />
                {/* Image Carousel */}
                <section className={imageCarouselClassName}>
                    <Carousel
                        images={mediaGallery}
                        bgColor={selectedColor?.hex || null}
                        isConfigurableProduct={isConfigurableProduct}
                        imageRef={imageRef}
                        lensRef={lensRef}
                        moveLens={moveLens}
                        lensSize="200px"
                        setZooming={setZooming}
                        zooming={zooming}
                        zoom
                        ref={mainImageRef}
                    />
                    {!isDesktop && (
                        <button
                            className={classes.zoomIn}
                            onClick={handleImageZoomOpenModal}
                        >
                            <Icon
                                src={ZoomIn}
                                classes={{ icon: classes.zoomInIcon }}
                            />
                        </button>
                    )}
                    {isMobile && (
                        <div className={classes.breadcrumbsMobile}>
                            {breadcrumbs}
                        </div>
                    )}
                </section>
                <Form className={classes.form} onSubmit={handleAddToCart}>
                    <div
                        className={
                            zooming ? classes.zooming : classes.notZooming
                        }
                    >
                        <ResultZoom
                            mainImageRef={mainImageRef}
                            zooming
                            resultRef={resultRef}
                            titleRef={titleRef}
                        />
                    </div>
                    {/* Price, SKU, Reviews, Quantity, Title and call to action block */}
                    <section>{mainInfo}</section>
                </Form>
                {/* Tabs for Product details, Reviews, Q&A and Specifications base */}
                <section className={classes.details}>
                    <Tabs initialTabKey={isFromTurnTo ? 2 : 1}>
                        <Tab
                            tab={
                                isLargeDesktop || !isDesktop
                                    ? 'Product details'
                                    : 'Details'
                            }
                            tabKey={1}
                        >
                            <div className={classes.detailsTabContent}>
                                <RichContent
                                    html={productDetails.description}
                                />
                            </div>
                        </Tab>
                        <Tab tab="Reviews" tabKey={2} ref={reviewTabRef}>
                            <ReviewsTab
                                productDetails={productDetails}
                                storeConfig={storeConfig}
                                isMobile={isMobile}
                            />
                        </Tab>
                        <Tab tab={'Q&A'} tabKey={3}>
                            <QATab
                                productDetails={productDetails}
                                storeConfig={storeConfig}
                                isMobile={isMobile}
                            />
                        </Tab>
                        <Tab tab="Specifications" tabKey={4}>
                            <ul className={classes.specificationsList}>
                                {specificationItems}
                            </ul>
                        </Tab>
                    </Tabs>
                </section>
            </div>
            {!!productDetails.relatedProducts?.length && (
                <RelatedProducts urlKey={product.url_key} isMobile={isMobile} />
            )}
        </>
    );
};

ProductFullDetail.propTypes = {
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price_range: shape({
            maximum_price: shape({
                regular_price: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                }).isRequired,
                final_price: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                }),
                discount: shape({
                    amount_off: number
                })
            }).isRequired
        }),
        media_gallery: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                url: string.isRequired
            })
        ),
        description: string,
        max_quantity: number,
        pickup_store_inventory: shape({
            qty: number,
            bopis_available: string,
            location: string,
            store_name: string
        })
    }).isRequired,
    storeConfig: object.isRequired,
    isMobile: bool,
    isDesktop: bool
};

export default ProductFullDetail;
