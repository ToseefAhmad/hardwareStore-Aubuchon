import React, { Fragment } from 'react';

import { useWindowSize } from '@magento/peregrine';
import CarouselShimmer from '@magento/venia-ui/lib/components/ProductImageCarousel/carousel.shimmer';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { BreadcrumbShimmer } from '@app/components/Breadcrumbs';
import classes from '@app/components/ProductFullDetail/productFullDetail.module.css';
import { useTailwindContext } from '@app/context/tailwind';

const ProductShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const imageCarouselClassName = isMobile
        ? classes.imageCarouselMobile
        : classes.imageCarousel;

    return (
        <Fragment>
            {!isMobile && <BreadcrumbShimmer />}
            <div className={classes.root}>
                <section className={imageCarouselClassName}>
                    <CarouselShimmer />
                </section>
                <section className={classes.mainInfo}>
                    <Shimmer
                        width="100%"
                        height={isMobile ? 1.25 : 1.5}
                        key="top-info-block"
                    />
                    <Shimmer
                        width="100%"
                        height={isMobile ? 9.125 : 16.75}
                        key="title-and-actions"
                    />
                    <div className={classes.availableInfoShimmer}>
                        <Shimmer
                            width="100%"
                            height={isMobile ? '98px' : '110px'}
                        />
                    </div>
                </section>
                <section className={classes.description}>
                    <div className={classes.descriptionTitle}>
                        <Shimmer
                            width="100%"
                            height={1}
                            key="description-title"
                        />
                    </div>
                    <Shimmer width="100%" height={1} key="description-line-1" />
                    <Shimmer width="100%" height={1} key="description-line-2" />
                    <Shimmer width="100%" height={1} key="description-line-3" />
                </section>
                <section className={classes.details}>
                    <Shimmer width="100%" height={16} key="tabs" />
                </section>
            </div>
        </Fragment>
    );
};

export default ProductShimmer;
