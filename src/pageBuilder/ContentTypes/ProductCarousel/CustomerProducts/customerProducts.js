import React from 'react';
import { useCookies } from 'react-cookie';

import BaseCarousel from '../BaseCarousel';

const CustomerProducts = ({ isLoading, ...props }) => {
    const [cookies] = useCookies();

    return (
        <BaseCarousel
            {...props}
            isLoading={!!cookies.aubuchon_cid && isLoading}
        />
    );
};

CustomerProducts.propTypes = BaseCarousel.propTypes;
CustomerProducts.defaultProps = BaseCarousel.defaultProps;

export default CustomerProducts;
