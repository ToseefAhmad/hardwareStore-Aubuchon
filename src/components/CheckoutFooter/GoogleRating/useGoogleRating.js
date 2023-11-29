import { useMemo } from 'react';

import { useStoreConfig } from '@app/hooks/useStoreConfig';

const numberWithDots = v => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const useGoogleRating = () => {
    const { storeConfig: storeConfigData } = useStoreConfig({
        fields: ['google_reviews_number', 'google_reviews_rate']
    });

    const {
        google_reviews_rate: rate,
        google_reviews_number: amount
    } = useMemo(() => storeConfigData || {}, [storeConfigData]);

    const amountWithDots = useMemo(() => {
        return amount ? numberWithDots(amount) : '';
    }, [amount]);

    const parsedRate = useMemo(() => {
        return rate ? parseFloat(rate) : 0;
    }, [rate]);

    return {
        rate: parsedRate,
        amount: amountWithDots
    };
};

export default useGoogleRating;
