import classnames from 'classnames';
import parse from 'html-react-parser';
import { bool, func, string } from 'prop-types';
import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import { IOrderProduct } from '../../types';

import Icon from '@app/components/Icon';
import { InfoFilled as InfoFilledIcon } from '@app/components/Icons';
import Link from '@app/components/Link';

import ItemOptions from './itemOptions';
import classes from './listItem.module.css';
import { useListItem } from './useListItem';

const OrderProductsListItem = props => {
    const { itemData, productUrlSuffix, isExpanded, openExpanded } = props;
    const {
        isItemCancelled,
        isQtyReduced,
        prices,
        thumbnailUrl,
        productLink
    } = useListItem({
        itemData,
        productUrlSuffix,
        openExpanded
    });

    return (
        <li
            className={classnames(classes.root, {
                [classes.isExpanded]: isExpanded
            })}
        >
            <Link className={classes.productPreview} to={productLink}>
                <Image
                    classes={{ image: classes.productPreviewImage }}
                    width={70}
                    height={70}
                    src={thumbnailUrl}
                    alt={itemData.product_name}
                />
                <p
                    className={classnames(classes.productPreviewQuantity, {
                        [classes.productPreviewQuantitySmall]: !isExpanded
                    })}
                >
                    {itemData.quantity_ordered}
                </p>
            </Link>
            <div className={classes.infoBlock}>
                <dl className={classes.sku}>
                    <div>
                        <dt className={classes.skuLabel}>SKU:</dt>
                        <dd className={classes.skuValue}>
                            {itemData.product_sku}
                        </dd>
                    </div>
                    {isItemCancelled && (
                        <div className={classes.orderItemChangesWrapper}>
                            <Icon src={InfoFilledIcon} />
                            <span className={classes.orderItemChanges}>
                                Cancelled
                            </span>
                        </div>
                    )}
                    {isQtyReduced && (
                        <div className={classes.orderItemChangesWrapper}>
                            <Icon src={InfoFilledIcon} />
                            <span className={classes.orderItemChanges}>
                                QTY Reduced to {itemData.qty_picked}
                            </span>
                        </div>
                    )}
                </dl>
                <Link className={classes.productName} to={productLink}>
                    {parse(itemData.product_name)}
                </Link>
                {itemData.product_options && itemData.selected_options && (
                    <ItemOptions
                        configurableOptions={itemData.product_options}
                        customizableOptions={itemData.selected_options}
                    />
                )}
            </div>
            <dl className={classes.priceBlock}>
                <dt className={classes.dt}>Price Each:</dt>
                <dd className={classes.dd}>{prices.salePrice}</dd>
            </dl>
            <dl className={classes.discountBlock}>
                <dt className={classes.dt}>Subtotal:</dt>
                <dd className={classes.dd}>{prices.subTotal}</dd>
            </dl>
            <dl className={classes.taxBlock}>
                <dt className={classes.dt}>Savings:</dt>
                <dd className={classes.dd}>{prices.savings}</dd>
            </dl>
            <dl className={classes.totalBlock}>
                <dt className={classes.dt}>Item Total:</dt>
                <dd className={classes.totalValue}>{prices.total}</dd>
            </dl>
        </li>
    );
};

OrderProductsListItem.propTypes = {
    itemData: IOrderProduct.isRequired,
    productUrlSuffix: string.isRequired,
    isExpanded: bool.isRequired,
    openExpanded: func.isRequired
};

export default OrderProductsListItem;
