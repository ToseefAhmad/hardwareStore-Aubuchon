import { useParams } from 'react-router-dom';

import { useUserContext } from '@app/context/user';
import { useURLQuery } from '@app/hooks/useURLQuery';

export const useOrderResolverPage = () => {
    const [{ isSignedIn }] = useUserContext();

    const { orderNumber } = useParams();
    const forceGuest = orderNumber.startsWith('m');
    const orderParam = orderNumber.slice(1);
    const query = useURLQuery();
    const pickup = query.get('pickup');
    const shortUrl = query.get('oid');
    const orderHistoryURL = `/order-history/${orderParam}`;
    return (
        (!isSignedIn || forceGuest ? '/guest' : '') +
        orderHistoryURL +
        (pickup && '' + pickup === '1' ? '/pickup' : '') +
        (!isSignedIn || forceGuest ? `?oid=${shortUrl}` : '')
    );
};
