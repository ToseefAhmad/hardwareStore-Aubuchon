import { arrayOf, bool, shape, string, func, oneOfType } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Link from '@app/components/Link';
import { SnapSlider } from '@app/components/ReactSnapSlider';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './linkSlider.module.css';

const LinkSlider = ({
    links,
    isLoading,
    classes: propClasses,
    sliderProps
}) => {
    const classes = useStyle(defaultClasses, propClasses);

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    if (isLoading) {
        return <Shimmer width="100%" height={isMobile ? '40px' : '54px'} />;
    }

    return (
        <>
            {!!links.length && (
                <div className={classes.root}>
                    <SnapSlider
                        {...sliderProps}
                        slidesGap={5}
                        isShownSideShadows
                    >
                        {links.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.url}
                                className={classes.item}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </SnapSlider>
                </div>
            )}
        </>
    );
};

LinkSlider.propTypes = {
    links: arrayOf(
        shape({
            url: string.isRequired,
            title: string.isRequired
        })
    ),
    isLoading: bool,
    classes: shape({
        item: string
    }),
    sliderProps: oneOfType([func, shape({})])
};

LinkSlider.defaultProps = {
    links: [],
    isLoading: false
};

export default LinkSlider;
