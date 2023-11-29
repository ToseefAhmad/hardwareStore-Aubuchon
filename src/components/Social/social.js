import classNames from 'classnames';
import { bool, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import SocialButton from '@app/components/SocialButton';
import { useBrandContext } from '@app/context/Brand';

import defaultClasses from './social.module.css';

const Social = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const [{ brand }] = useBrandContext();

    const { isTitleVisible, isIconsAlignLeft } = props;

    return (
        <div
            className={classNames(
                classes.root,
                isIconsAlignLeft ? classes.left : classes.center
            )}
        >
            {isTitleVisible ? (
                <div className={classes.textWrapper}>
                    <h4 className={classes.title}>Get connected</h4>
                    <p className={classes.text}>
                        with the {brand?.name?.split(' ')[0]} community
                    </p>
                </div>
            ) : null}
            <ul className={classes.linkList}>
                {brand?.social_facebook && (
                    <li className={classes.linkItem}>
                        <SocialButton
                            type={'facebook'}
                            title={'Facebook'}
                            url={brand?.social_facebook}
                        />
                    </li>
                )}
                {brand?.social_instagram && (
                    <li className={classes.linkItem}>
                        <SocialButton
                            type={'instagram'}
                            title={'Instagram'}
                            url={brand?.social_instagram}
                        />
                    </li>
                )}
                {brand?.social_twitter && (
                    <li className={classes.linkItem}>
                        <SocialButton
                            type={'twitter'}
                            title={'Twitter'}
                            url={brand?.social_twitter}
                        />
                    </li>
                )}
                {brand?.social_youtube && (
                    <li className={classes.linkItem}>
                        <SocialButton
                            type={'youtube'}
                            title={'Youtube'}
                            url={brand?.social_youtube}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
};

Social.propTypes = {
    classes: shape({
        root: string
    }),
    isTitleVisible: bool,
    isIconsAlignLeft: bool
};

Social.defaultProps = {
    isTitleVisible: true,
    isIconsAlignLeft: false
};

export default Social;
