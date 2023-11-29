import { useState } from 'react';

export const usePaymentMethod = () => {
    const [imgLoaded, setImageLoaded] = useState(false);

    return { imgLoaded, setImageLoaded };
};
