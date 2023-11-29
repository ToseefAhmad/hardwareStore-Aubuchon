import { func } from 'prop-types';
import React from 'react';

import GoogleMaps from '@app/components/GoogleMaps';

import Content from './Content';

const WarningContent = ({ handleAddToCart, onCancel }) => {
    return (
        <GoogleMaps>
            <Content handleAddToCart={handleAddToCart} onCancel={onCancel} />
        </GoogleMaps>
    );
};

WarningContent.propTypes = {
    handleAddToCart: func,
    onCancel: func
};

export default WarningContent;
