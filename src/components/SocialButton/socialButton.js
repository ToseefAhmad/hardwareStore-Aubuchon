import { oneOf, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { Facebook, Instagram, Twitter, Youtube } from '@app/components/Icons';

import defaultClasses from './socialButton.module.css';

const SOCIAL_DATA = {
    facebook: {
        component: Facebook
    },
    instagram: {
        component: Instagram
    },
    twitter: {
        component: Twitter
    },
    youtube: {
        component: Youtube
    }
};

/**
 * Social button component.
 *
 * @typedef SocialButton
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a single social link button.
 */
const SocialButton = ({ classes: propClasses, type, title, url }) => {
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <a
            className={classes.root}
            href={url}
            target="_blank"
            rel="noreferrer"
            title={title}
        >
            <Icon src={SOCIAL_DATA[type].component} />
        </a>
    );
};

/**
 * Props for {@link SocialButton}
 *
 * @typedef props
 *
 * @property {Object} classes classes used for Social Button
 * @property {Object} classes.root container styling for Social Button
 * @property {string} type type of the Social Button
 * @property {string} title title for accessibility
 * @property {string} url social media link
 */
SocialButton.propTypes = {
    classes: shape({
        root: string
    }),
    type: oneOf(['facebook', 'instagram', 'twitter', 'youtube']).isRequired,
    title: string,
    url: string
};

export default SocialButton;
