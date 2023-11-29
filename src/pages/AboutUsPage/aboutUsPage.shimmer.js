import classnames from 'classnames';
import { shape, string } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import PageHeadingShimmer from '@app/components/PageHeadingShimmer';
import { useTailwindContext } from '@app/context/tailwind';
import rowClasses from '@app/pageBuilder/ContentTypes/Row/row.module.css';
import cmsClasses from '@app/RootComponents/CMS/cms.module.css';

import defaultClasses from './aboutUsPage.shimmer.module.css';

const AboutUsPageShimmer = ({ classes: propClasses }) => {
    const classes = mergeClasses(defaultClasses, propClasses);
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    return (
        <div className={classes.root}>
            <div className={cmsClasses.root}>
                <div className={rowClasses.contained}>
                    <div className={classes.heading}>
                        <div className="au-page__title">
                            <PageHeadingShimmer />
                        </div>
                    </div>
                </div>
                <div className={rowClasses.contained}>
                    <Shimmer
                        width="100%"
                        height={isMobile ? '156px' : '280px'}
                    />
                </div>
                <div className={rowClasses.contained}>
                    <Shimmer
                        width="100%"
                        height={isMobile ? '240px' : '104px'}
                    />
                </div>
                <div className={rowClasses.contained}>
                    {isMobile ? (
                        <Shimmer width="100%" height="139px" />
                    ) : (
                        <div className={classes.carousel}>
                            {Array.from({ length: 3 }).map((item, idx) => (
                                <Shimmer
                                    key={idx}
                                    width="330px"
                                    height="245px"
                                />
                            ))}
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <div
                        className={classnames(
                            rowClasses.contained,
                            'au-page__join-us'
                        )}
                    >
                        <Shimmer width="100%" height="317px" />
                    </div>
                )}
            </div>
        </div>
    );
};

AboutUsPageShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default AboutUsPageShimmer;
