import {
    getMargin,
    getBackgroundImages,
    getBorder,
    getPadding,
    getTextAlign,
    getCssClasses,
    getIsHidden,
    getMediaQueries
} from '@app/pageBuilder/utils';

/**
 * Determine the button type based on class
 *
 * @param node
 * @returns {string}
 */
const getButtonType = node => {
    if (node.classList.contains('pagebuilder-button-secondary')) {
        return 'secondary';
    }
    if (node.classList.contains('pagebuilder-button-link')) {
        return 'link';
    }
    return 'primary';
};

export default (node, props) => {
    const wrapperElement = node.querySelector('[data-element="wrapper"]');
    const overlayElement = node.querySelector('[data-element="overlay"]');
    const linkElement = node.querySelector('a[data-element="link"]');
    const buttonElement = node.querySelector('[data-element="button"]');
    const videoOverlayElement = node.querySelector(
        '[data-element="video_overlay"]'
    );
    const showButton = node.getAttribute('data-show-button');
    const showOverlay = node.getAttribute('data-show-overlay');

    const storeSpecificBanner = node.getAttribute(
        'data-slide-store-multiselect'
    );

    let minHeightPaddingElement = wrapperElement;
    if (props.appearance === 'poster') {
        minHeightPaddingElement = overlayElement;
    }

    const minHeightMobile = node.getAttribute('data-min-height-mobile');

    return {
        minHeight: minHeightPaddingElement.style.minHeight || null,
        minHeightMobile: minHeightMobile || null,
        backgroundColor: wrapperElement.style.backgroundColor,
        ...getBackgroundImages(wrapperElement),
        width: Number(node.getAttribute('data-background-width')) || 'auto',
        height: Number(node.getAttribute('data-background-height')) || 'auto',
        mobileWidth:
            Number(node.getAttribute('data-background-mobile-width')) || 'auto',
        mobileHeight:
            Number(node.getAttribute('data-background-mobile-height')) ||
            'auto',
        content: node.querySelector('[data-element="content"]').innerHTML,
        contentMobile: node.querySelector('[data-element="content_mobile"]')
            ?.innerHTML,
        link: linkElement ? linkElement.getAttribute('href') : null,
        linkType: linkElement
            ? linkElement.getAttribute('data-link-type')
            : null,
        openInNewTab:
            linkElement && linkElement.getAttribute('target') === '_blank',
        showButton,
        buttonText:
            buttonElement && showButton !== 'never'
                ? buttonElement.textContent
                : null,
        buttonType:
            buttonElement && showButton !== 'never'
                ? getButtonType(buttonElement)
                : null,
        showOverlay,
        storeSpecificBanner,
        overlayColor:
            overlayElement && showOverlay !== 'never'
                ? overlayElement.getAttribute('data-overlay-color')
                : null,
        backgroundType: wrapperElement.getAttribute('data-background-type'),
        videoSrc: wrapperElement.getAttribute('data-video-src'),
        videoFallbackSrc: wrapperElement.getAttribute(
            'data-video-fallback-src'
        ),
        videoLoop: wrapperElement.getAttribute('data-video-loop') === 'true',
        videoPlayOnlyVisible:
            wrapperElement.getAttribute('data-video-play-only-visible') ===
            'true',
        videoLazyLoading:
            wrapperElement.getAttribute('data-video-lazy-load') === 'true',
        videoOverlayColor: videoOverlayElement
            ? videoOverlayElement.getAttribute('data-video-overlay-color')
            : null,
        ...getTextAlign(wrapperElement),
        ...getBorder(wrapperElement),
        ...getCssClasses(node),
        ...getMargin(node),
        ...getPadding(minHeightPaddingElement),
        ...getIsHidden(node),
        ...getMediaQueries(minHeightPaddingElement)
    };
};
