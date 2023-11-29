import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';

import classes from './content.module.css';
import { useContent } from './useContent';

const ImageModalContent = () => {
    const { imageProps, description, handleCloseModal } = useContent();

    return (
        <section className={classes.root}>
            <Button
                classes={{ secondary: classes.button }}
                priority="secondary"
                onClick={handleCloseModal}
            >
                <Icon src={CloseIcon} />
            </Button>
            <figure className={classes.figure}>
                <Image
                    {...imageProps}
                    classes={{
                        root: classes.imageRoot,
                        image: classes.image
                    }}
                />
                {description && (
                    <figcaption className={classes.description}>
                        {description}
                    </figcaption>
                )}
            </figure>
        </section>
    );
};

export default ImageModalContent;
