import { useEffect, useMemo, useState, useRef, useCallback } from 'react';

import { useBrandContext } from '@app/context/Brand';
import { smoothScroll } from '@app/utils/smooth-scroll';
import { turnToApi } from '@app/utils/TurnTo';

export const useWhyDidYouChooseThis = ({ storeConfig, isMobile, sku }) => {
    const whyDidYouChooseThisContainerRef = useRef();
    const [
        whyDidYouChooseThisComments,
        setWhyDidYouChooseThisComments
    ] = useState(null);
    const [areCommentsLoading, setAreCommentsLoading] = useState(false);
    const [areAllCommentsShown, setAreAllCommentsShown] = useState();

    const [{ brand }] = useBrandContext();

    const toggleAreAllCommentsShown = useCallback(() => {
        setAreAllCommentsShown(prevState => !prevState);
    }, []);

    useEffect(() => {
        if (areAllCommentsShown === false) {
            (async () => {
                await smoothScroll({
                    container:
                        document.scrollingElement || document.documentElement,
                    to: {
                        y:
                            whyDidYouChooseThisContainerRef.current?.offsetTop -
                            (isMobile ? 90 : 155)
                    }
                });
            })();
        }
    }, [areAllCommentsShown, isMobile]);

    useEffect(() => {
        (async () => {
            setAreCommentsLoading(true);

            const response = await turnToApi.getWhyDidYouChooseThisComments({
                storeConfig,
                sku
            });

            setWhyDidYouChooseThisComments(response.data);

            setAreCommentsLoading(false);
        })();
    }, [sku, storeConfig]);

    const comments = useMemo(() => {
        const comments = whyDidYouChooseThisComments?.comments || [];

        return areAllCommentsShown ? comments : comments.slice(0, 4);
    }, [areAllCommentsShown, whyDidYouChooseThisComments]);

    return {
        commentsTotal:
            whyDidYouChooseThisComments?.total > 50
                ? 50
                : whyDidYouChooseThisComments?.total,
        comments,
        brandName: brand.name,
        areCommentsLoading,
        areAllCommentsShown,
        toggleAreAllCommentsShown,
        whyDidYouChooseThisContainerRef
    };
};
