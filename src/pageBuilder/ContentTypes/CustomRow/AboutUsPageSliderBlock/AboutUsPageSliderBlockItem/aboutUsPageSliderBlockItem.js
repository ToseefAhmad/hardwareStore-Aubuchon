import { object, string } from 'prop-types';
import React from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import Image from '@magento/venia-ui/lib/components/Image';

import { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './aboutUsPageSliderBlockItem.module.css';

const AboutUsPageSliderBlockItem = props => {
    const { imageProps, description } = props;

    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleImageClick = () => {
        toggleModal({
            identifier: MODAL_NAMES.image,
            props: {
                imageProps,
                description
            }
        });
    };

    return (
        <figure className={classes.root}>
            <button
                className={classes.imageButton}
                type="button"
                onClick={handleImageClick}
            >
                <Image
                    {...imageProps}
                    classes={{
                        root: classes.imageRoot,
                        image: classes.image
                    }}
                />
            </button>
            <figcaption className={classes.description}>
                {description}
            </figcaption>
        </figure>
    );
};

AboutUsPageSliderBlockItem.propTypes = {
    imageProps: object.isRequired,
    description: string.isRequired
};

export default AboutUsPageSliderBlockItem;
