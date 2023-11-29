import { bool, func, number, shape, string } from 'prop-types';
import React, { useMemo } from 'react';

import { useThumbnail } from '@magento/peregrine/lib/talons/ProductImageCarousel/useThumbnail';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

import defaultClasses from './thumbnail.module.css';

const DEFAULT_THUMBNAIL_HEIGHT = 80;
const DEFAULT_THUMBNAIL_WIDTH = 80;

const Thumbnail = props => {
    const {
        isActive,
        item: { url, label },
        onClickHandler,
        itemIndex,
        isDisplayed
    } = props;

    const { handleClick } = useThumbnail({
        onClickHandler,
        itemIndex
    });

    const classes = useStyle(defaultClasses, props.classes);

    const thumbnailImage = useMemo(() => {
        if (!isDisplayed) {
            return null;
        }

        return url ? (
            <Image
                alt={label}
                classes={{ image: classes.image, root: classes.imageContainer }}
                height={DEFAULT_THUMBNAIL_HEIGHT}
                resource={url}
                width={DEFAULT_THUMBNAIL_WIDTH}
            />
        ) : (
            <Image
                alt={label}
                classes={{ image: classes.image }}
                src={transparentPlaceholder}
            />
        );
    }, [url, label, classes.image, classes.imageContainer, isDisplayed]);

    return (
        <span
            className={isActive ? classes.rootSelected : classes.root}
            onClick={handleClick}
            role="button"
            aria-hidden="true"
        >
            {thumbnailImage}
        </span>
    );
};

Thumbnail.propTypes = {
    classes: shape({
        root: string,
        rootSelected: string
    }),
    isActive: bool,
    item: shape({
        label: string,
        url: string.isRequired
    }),
    itemIndex: number,
    onClickHandler: func.isRequired,
    isDisplayed: bool
};

Thumbnail.defaultProps = {
    isDisplayed: true
};
export default Thumbnail;
