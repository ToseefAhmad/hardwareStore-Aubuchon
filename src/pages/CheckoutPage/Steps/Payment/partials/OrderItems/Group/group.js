import classnames from 'classnames';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    ChevronDown as ArrowDownIcon,
    ChevronUpSmall as ArrowUpIcon
} from '@app/components/Icons';

import Item from '../Item';
import classes from './group.module.css';
import { useGroup } from './useGroup';

const Group = ({ items, storeUrlSuffix }) => {
    const {
        showAll,
        toggleSetShowAll,
        hiddenItemsCount,
        hiddenCardsStartIndex
    } = useGroup({ items });

    return (
        <div className={classes.root}>
            <div>
                {showAll && (
                    <div className={classes.head}>
                        <p className={classes.col}>Status</p>
                        <p className={classes.col}>Price Each</p>
                        <p className={classes.col}>Item Total</p>
                    </div>
                )}
                <div
                    className={classnames(classes.row, {
                        [classes.grid]: showAll
                    })}
                >
                    {items?.map((item, index) => {
                        return (
                            <Item
                                key={item.uid}
                                item={item}
                                storeUrlSuffix={storeUrlSuffix}
                                isHidden={
                                    index > hiddenCardsStartIndex && !showAll
                                }
                                showFull={showAll}
                            />
                        );
                    })}
                    {hiddenItemsCount && (
                        <div className={classes.itemPlaceholder}>
                            +{hiddenItemsCount}
                        </div>
                    )}
                </div>
            </div>
            <Button
                onClick={toggleSetShowAll}
                isShort
                classes={{
                    secondary: classes.button
                }}
            >
                <span className={classes.buttonText}>
                    {showAll ? 'Hide' : 'View'} all items
                </span>
                <span className={classes.buttonIcon}>
                    <Icon src={showAll ? ArrowUpIcon : ArrowDownIcon} />
                </span>
            </Button>
        </div>
    );
};

Group.propTypes = {
    items: arrayOf(
        shape({
            uid: string,
            product: shape({
                uid: string,
                name: string,
                url_key: string,
                thumbnail: shape({
                    url: string
                }),
                stock_status: string,
                pickup_store_inventory: shape({
                    boss_available: string
                }),
                price_range: shape({
                    maximum_price: shape({
                        regular_price: shape({
                            value: number,
                            currency: string
                        })
                    })
                })
            }),
            prices: shape({
                price: shape({
                    currency: string,
                    value: number
                }),
                total_item_discount: shape({
                    value: number
                })
            }),
            quantity: number
        })
    ),
    isLoading: bool,
    storeUrlSuffix: string
};

export default Group;
