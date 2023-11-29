import React from 'react';
import { Redirect } from 'react-router-dom';

import { useOrderResolverPage } from '@app/pages/OrderResolverPage/useOrderResolverPage';

const OrderResolverPage = () => {
    const redirect = useOrderResolverPage();

    return <Redirect to={redirect} />;
};

export default OrderResolverPage;
