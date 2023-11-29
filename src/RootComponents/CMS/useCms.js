import { useEffect, useMemo } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const useCms = props => {
    const [, { dispatch }] = useEventingContext();

    const cmsPage = useMemo(() => props, [props]);

    useEffect(() => {
        if (cmsPage) {
            dispatch({
                type: 'CMS_PAGE_VIEW',
                payload: {
                    url_key: cmsPage.url_key,
                    title: cmsPage.title
                }
            });
        }
    }, [cmsPage, dispatch]);

    return {
        cmsPage
    };
};
