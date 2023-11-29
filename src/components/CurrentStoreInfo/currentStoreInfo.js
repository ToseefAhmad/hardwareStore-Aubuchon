import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

import StoreStatus from '@app/components/StoreComponents/Status';

import defaultClasses from './currentStoreInfo.module.css';
import CurrentStoreInfoShimmer from './currentStoreInfo.shimmer';
import { useCurrentStoreInfo } from './useCurrentStoreInfo';

const CurrentStoreInfo = ({ classes: propsClasses }) => {
    const {
        imageSrc,
        brandLogo,
        brandName,
        storeName,
        isOpen,
        address,
        isLoading,
        storeWorkInfo
    } = useCurrentStoreInfo();
    const classes = useStyle(defaultClasses, propsClasses);
    const storeStatusClasses = propsClasses?.close
        ? {
              close: propsClasses.close,
              workHours: propsClasses.workHours,
              open: propsClasses.open
          }
        : {};

    return (
        <>
            {isLoading ? (
                <CurrentStoreInfoShimmer />
            ) : (
                <div className={classes.root}>
                    {imageSrc ? (
                        <Image
                            classes={{
                                root: classes.imageRoot,
                                image: classes.image
                            }}
                            src={imageSrc}
                            height={100}
                            width={140}
                            alt={storeName}
                        />
                    ) : (
                        <div className={classes.imagePlaceholder} />
                    )}
                    <div className={classes.info}>
                        <Image
                            classes={{
                                image: classes.logo
                            }}
                            src={brandLogo}
                            alt={brandName}
                        />
                        <div className={classes.text}>
                            <strong className={classes.storeName}>
                                {storeName}
                            </strong>
                            <p className={classes.address}>
                                {address}, {storeName}
                            </p>
                        </div>
                        <StoreStatus
                            isOpen={isOpen}
                            classes={storeStatusClasses}
                            storeWorkInfo={storeWorkInfo}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

CurrentStoreInfo.propTypes = {
    classes: shape({
        root: string,
        imageRoot: string,
        image: string,
        logo: string,
        info: string,
        close: string,
        address: string,
        storeName: string,
        workHours: string,
        text: string,
        open: string
    })
};

export default CurrentStoreInfo;
