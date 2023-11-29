import { useStoreConfig } from '@app/hooks/useStoreConfig';

export const useGallery = () => {
    const { storeConfig } = useStoreConfig({ fields: ['product_url_suffix'] });

    return {
        storeConfig
    };
};
