import { shape, string, number } from 'prop-types';
import React from 'react';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import Image from '@app/components/Image';

import classes from './managers.module.css';

const Managers = ({ managers, store }) => {
    return (
        <div className={classes.root}>
            <div className={classes.manager}>
                <Image
                    classes={{
                        image: classes.image,
                        container: classes.imageContainer
                    }}
                    src={resourceUrl(managers.manager_image, {
                        type: 'image-wysiwyg',
                        quality: 80,
                        width: 60,
                        height: 60,
                        fit: 'cover'
                    })}
                    alt={`Store Manager at ${store}`}
                />
                <div className={classes.description}>
                    <p className={classes.name}>{managers.manager_name}</p>
                    <p className={classes.job}>Store Manager</p>
                </div>
            </div>
            <div className={classes.manager}>
                <Image
                    classes={{
                        image: classes.image,
                        container: classes.imageContainer
                    }}
                    src={resourceUrl(managers.paint_manager_image, {
                        type: 'image-wysiwyg',
                        quality: 80,
                        width: 60,
                        height: 60,
                        fit: 'cover'
                    })}
                    alt={`Paint Manager at ${store}`}
                />
                <div className={classes.description}>
                    <p className={classes.name}>
                        {managers.paint_manager_name}
                    </p>
                    <p className={classes.job}>Paint Manager</p>
                </div>
            </div>
        </div>
    );
};

Managers.propTypes = {
    store: string,
    managers: shape({
        id: number,
        manager_name: string,
        manager_image: string,
        paint_manager_name: string,
        paint_manager_image: string
    })
};

export default Managers;
