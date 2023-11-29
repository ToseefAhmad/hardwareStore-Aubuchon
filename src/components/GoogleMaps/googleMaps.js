import { Wrapper } from '@googlemaps/react-wrapper';
import { node } from 'prop-types';
import React from 'react';

import { GoogleMapsContextProvider } from './googleMapsContext';

const GoogleMaps = ({ children }) => {
    if (navigator?.userAgent?.includes('Prerender')) {
        return null;
    }

    return (
        <Wrapper
            apiKey={GOOGLE_MAPS_API_KEY}
            libraries={['places', 'geometry']}
        >
            <GoogleMapsContextProvider>{children}</GoogleMapsContextProvider>
        </Wrapper>
    );
};

GoogleMaps.propTypes = {
    children: node
};

export default GoogleMaps;
