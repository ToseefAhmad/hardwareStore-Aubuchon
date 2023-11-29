import { arrayOf, shape, string, object } from 'prop-types';
import React from 'react';

import defaultClasses from '@magento/pagebuilder/lib/ContentTypes/Banner/banner.shimmer.module.css';
import { useMediaQuery } from '@magento/peregrine/lib/hooks/useMediaQuery';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const { matchMedia } = globalThis;

const BannerShimmer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        minHeight: minHeightDesktop,
        minHeightMobile,
        border,
        borderWidth,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        mediaQueries,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        cssClasses = []
    } = props;

    let minHeight = minHeightDesktop;
    if (
        minHeightMobile &&
        matchMedia &&
        !matchMedia('(min-width: 768px)').matches
    ) {
        minHeight = minHeightMobile;
    }

    const { styles: mediaQueryStyles } = useMediaQuery({ mediaQueries });

    const rootStyles = {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
    };

    const wrapperStyles = {
        minHeight: mediaQueryStyles?.minHeight || minHeight,
        minWidth: '100%',
        border,
        borderWidth,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };

    return (
        <Shimmer
            aria-live="polite"
            aria-busy="true"
            classes={{
                root_rectangle: [
                    classes.root,
                    classes.shimmerRoot,
                    ...cssClasses
                ].join(' ')
            }}
            style={rootStyles}
        >
            <div className={classes.wrapper} style={wrapperStyles}>
                <div className={classes.overlay}>
                    <div className={classes.content} />
                </div>
            </div>
        </Shimmer>
    );
};

/**
 * Props for {@link BannerShimmer}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the banner
 * @property {String} classes.root CSS class for the banner root element
 * @property {String} classes.shimmerRoot CSS class for the banner
 * shimmer root_rectangle element
 * @property {String} classes.wrapper CSS class for the banner wrapper element
 * @property {String} classes.overlay CSS class for the banner overlay element
 * @property {String} classes.content CSS class for the banner content element
 * @property {String} minHeight CSS minimum height property
 * @property {String} minHeightMobile CSS minimum height property for mobile device width
 * @property {String} border CSS border property
 * @property {String} borderWidth CSS border width property
 * @property {String} marginTop CSS margin top property
 * @property {String} marginRight CSS margin right property
 * @property {String} marginBottom CSS margin bottom property
 * @property {String} marginLeft CSS margin left property
 * @property {Array} mediaQueries List of media query rules to be applied to the component
 * @property {String} paddingTop CSS padding top property
 * @property {String} paddingRight CSS padding right property
 * @property {String} paddingBottom CSS padding bottom property
 * @property {String} paddingLeft CSS padding left property
 * @property {Array} cssClasses List of CSS classes to be applied to the component
 */
BannerShimmer.propTypes = {
    classes: shape({
        root: string,
        shimmerRoot: string,
        wrapper: string,
        overlay: string,
        content: string
    }),
    minHeight: string,
    minHeightMobile: string,
    border: string,
    borderWidth: string,
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string,
    mediaQueries: arrayOf(
        shape({
            media: string,
            style: object
        })
    ),
    paddingTop: string,
    paddingRight: string,
    paddingBottom: string,
    paddingLeft: string,
    cssClasses: arrayOf(string)
};

export default BannerShimmer;
