import classnames from 'classnames';
import { any } from 'prop-types';
import React, { useMemo } from 'react';

import Icon from '@app/components/Icon';
import { Like } from '@app/components/Icons';
import LinkButton from '@app/components/LinkButton';
import { SnapSlider } from '@app/components/ReactSnapSlider';

import BaseCarousel from '../BaseCarousel';
import classes from './bestsellers.module.css';
import BestsellerShimmer from './bestsellers.shimmer';
import { TOP_PICKS_KEY, useBestsellers } from './useBestsellers';

const Bestsellers = ({ items: data, title, isLoading }) => {
    const {
        storeLocation,
        bestsellerCategories,
        selectedBestsellerCategory,
        selectedBestsellerCategoryKey,
        setSelectedBestsellerCategoryKey
    } = useBestsellers({ data });

    const bestsellerCategoryBadges = useMemo(() => {
        return (
            !isLoading &&
            bestsellerCategories.map((item, key) => (
                <LinkButton
                    key={item.id}
                    className={classnames(classes.bestsellerCategory, {
                        [classes.bestsellerCategoryFirst]: key === 0,
                        [classes.bestsellerCategoryLast]:
                            key === bestsellerCategories.length - 1,
                        [classes.bestsellerCategorySecondary]:
                            item.id !== selectedBestsellerCategoryKey,
                        [classes.bestsellerCategoryPrimary]:
                            item.id === selectedBestsellerCategoryKey
                    })}
                    onPress={() => {
                        setSelectedBestsellerCategoryKey(item.id);
                    }}
                >
                    <span className={classes.bestsellerCategoryContent}>
                        {item.id === TOP_PICKS_KEY && (
                            <span
                                className={classnames({
                                    [classes.topPickIcon]:
                                        item.id !==
                                        selectedBestsellerCategoryKey
                                })}
                            >
                                <Icon src={Like} />
                            </span>
                        )}
                        {item.title}
                    </span>
                </LinkButton>
            ))
        );
    }, [
        bestsellerCategories,
        isLoading,
        selectedBestsellerCategoryKey,
        setSelectedBestsellerCategoryKey
    ]);

    if (isLoading) {
        return <BestsellerShimmer />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <span>
                    {title} {storeLocation}
                </span>
            </div>
            <div className={classes.bestsellerCategories}>
                <SnapSlider slidesGap={0} isShownSideShadows threshold={0.95}>
                    {bestsellerCategoryBadges}
                </SnapSlider>
            </div>
            <BaseCarousel items={selectedBestsellerCategory.products} />
        </div>
    );
};

Bestsellers.propTypes = {
    ...BaseCarousel.propTypes,
    items: any
};
Bestsellers.defaultProps = BaseCarousel.defaultProps;

export default Bestsellers;
