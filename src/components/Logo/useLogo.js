import { useState } from 'react';

import { useBrandContext } from '@app/context/Brand';

export const useLogo = () => {
    const [{ brand, brandOverride }] = useBrandContext();

    const [imgLoaded, setImgLoaded] = useState(false);

    return {
        title: brandOverride?.name || brand.name,
        logoUrl: brandOverride?.logo || brand.logo,
        imgLoaded,
        setImgLoaded
    };
};
