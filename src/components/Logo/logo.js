import PropTypes from 'prop-types';
import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import { useLogo } from '@app/components/Logo/useLogo';

import classes from './logo.module.css';

/**
 * A component that renders a logo in the header.
 *
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = ({ height, width }) => {
    const { title, logoUrl, imgLoaded, setImgLoaded } = useLogo();

    return (
        <div className={classes.root}>
            <Image
                alt={title}
                classes={{ image: classes.logo }}
                src={logoUrl}
                height={height}
                width={width}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
            />
            {!imgLoaded && (
                <div className={classes.shimmer}>
                    {<Shimmer height={`${height}px`} width={`${width}px`} />}
                </div>
            )}
        </div>
    );
};

/**
 * Props for the Logo component.
 *
 * @kind props
 *
 * @property {Object} classes An object containing the class names for the Logo component.
 * @property {string} classes.logo Classes for logo
 * @property {number} [height=18] Height of the logo.
 * @property {number} [width=102] Width of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number,
    width: PropTypes.number
};

Logo.defaultProps = {
    height: 24,
    width: 118
};

export default Logo;
