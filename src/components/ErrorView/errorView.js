import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Link from '@app/components/Link';
import RecentlyViewedProducts from '@app/pageBuilder/ContentTypes/ProductCarousel/RecentlyViewedProducts';

import classes from './errorView.module.css';
import { useErrorView } from './useErrorView';

const ErrorView = () => {
    const { image404Src, number404Src } = useErrorView();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.image404}>
                    <Image
                        src={image404Src}
                        alt="Error View"
                        classes={{
                            image: classes.errorImage
                        }}
                    />
                </div>
                <div className={classes.number404}>
                    <Image
                        src={number404Src}
                        alt="Error 404"
                        classes={{
                            image: classes.errorImage
                        }}
                    />
                </div>
                <p className={classes.header}>Page not found</p>
                <p className={classes.message}>
                    Sorry, the page you are looking for doesn’t exist.
                </p>
                <div className={classes.actionsContainer}>
                    <Link to="/">
                        <Button priority="high" type="button">
                            Go to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={classes.rvpContainer}>
                <RecentlyViewedProducts />
            </div>
        </div>
    );
};

export default ErrorView;
