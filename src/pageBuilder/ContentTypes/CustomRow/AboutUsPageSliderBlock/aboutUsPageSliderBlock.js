import { arrayOf, shape, string } from 'prop-types';
import React, { useMemo } from 'react';

import { useWindowSize } from '@magento/peregrine';

import {
    SnapSlider,
    SnapSliderWithPagination
} from '@app/components/ReactSnapSlider';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './aboutUsPageSliderBlock.module.css';
import AboutUsPageSliderBlockItem from './AboutUsPageSliderBlockItem';

const AboutUsPageSliderBlock = ({ childItems }) => {
    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();

    const SliderComponent =
        innerWidth < screens.lg ? SnapSliderWithPagination : SnapSlider;

    const phantomHtml = useMemo(() => {
        const div = globalThis.document.createElement('div');
        div.style.display = 'none';

        return div;
    }, []);

    const slides = useMemo(
        () =>
            childItems
                .filter(
                    item =>
                        item.contentType === 'row' && item.children.length >= 2
                )
                .map((item, idx) => {
                    const imgConfig = item.children.filter(
                        type => type.contentType === 'image'
                    )[0];
                    const textConfig = item.children.filter(
                        type => type.contentType === 'text'
                    )[0];

                    phantomHtml.innerHTML = textConfig?.content || '';

                    const imgSrc = imgConfig?.desktopImage?.src || '';
                    const imgAlt = imgConfig?.altText || '';

                    return (
                        <AboutUsPageSliderBlockItem
                            key={idx}
                            imageProps={{
                                resource: imgSrc,
                                alt: imgAlt
                            }}
                            description={phantomHtml.innerText}
                        />
                    );
                }),
        [childItems, phantomHtml]
    );

    return (
        <SliderComponent
            slidesGap={5}
            arrowClasses={{
                root: classes.arrowRoot,
                disabled: classes.arrowDisabled
            }}
        >
            {slides}
        </SliderComponent>
    );
};

AboutUsPageSliderBlock.propTypes = {
    childItems: arrayOf(
        shape({
            contentType: string.isRequired,
            children: arrayOf(
                shape({
                    contentType: string.isRequired,
                    desktopImage: shape({
                        src: string.isRequired
                    }),
                    mobileImage: shape({
                        src: string.isRequired
                    }),
                    altText: string,
                    content: string
                })
            ).isRequired
        })
    ).isRequired
};

export default AboutUsPageSliderBlock;
