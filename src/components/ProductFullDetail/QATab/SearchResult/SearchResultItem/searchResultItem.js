import { func, shape, string, number } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { ChevronRightLarge as ChevronRightLargeIcon } from '@app/components/Icons';
import { RatingStars } from '@app/components/ProductFullDetail';

import classes from './searchResultItem.module.css';

const SearchResultItem = ({ item, handleExpandSearchResultItem }) => {
    return (
        <>
            <button
                className={classes.item}
                type="button"
                onClick={() =>
                    handleExpandSearchResultItem({
                        id: item.id,
                        type: item.ugcType
                    })
                }
            >
                <div>
                    {item.ugcType === 'ir' ? (
                        <>
                            <p className={classes.itemTitle}>{item.title}</p>
                            <p>
                                Review for <span>{item.itemTitle}</span>
                            </p>
                            <div className={classes.itemRating}>
                                <RatingStars
                                    rating={item.rating}
                                    hideReviewCount={true}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={classes.itemTitle}>{item.text}</p>
                            <p>
                                Question about <span>{item.itemTitle}</span>
                            </p>
                            <div className={classes.answerCount}>
                                {(!item.answerCount && 'No Answers') ||
                                    (item.answerCount === 1 && '1 Answer') ||
                                    `${item.answerCount} Answers`}
                            </div>
                        </>
                    )}
                </div>
                <div className={classes.itemIcon}>
                    <Icon src={ChevronRightLargeIcon} />
                </div>
            </button>
        </>
    );
};

SearchResultItem.propTypes = {
    handleExpandSearchResultItem: func.isRequired,
    item: shape({
        id: number.isRequired,
        ugcType: string.isRequired,
        title: string,
        itemTitle: string.isRequired,
        rating: number,
        text: string.isRequired,
        answerCount: number
    })
};

export default SearchResultItem;
