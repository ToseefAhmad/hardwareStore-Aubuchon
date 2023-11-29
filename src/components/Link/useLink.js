import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@magento/peregrine/lib/hooks/useIntersectionObserver';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/MagentoRoute/magentoRoute.gql';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

const useLink = (props, passedOperations = {}) => {
    const { innerRef: originalRef, to } = props;
    const shouldPrefetch = props.prefetchType || props.shouldPrefetch;
    // Fixed: We can't pass empty object to useLazyQuery
    const operations = mergeOperations(DEFAULT_OPERATIONS, passedOperations);

    const intersectionObserver = useIntersectionObserver();
    const { resolveUrlQuery } = operations;
    const generatedRef = useRef();
    const elementRef =
        originalRef || !shouldPrefetch ? originalRef : generatedRef;
    const [runQuery, { called: pageTypeCalled }] = useLazyQuery(
        resolveUrlQuery
    );
    const linkPath = shouldPrefetch ? resourceUrl(to) : null;

    useEffect(() => {
        if (
            !shouldPrefetch ||
            pageTypeCalled ||
            !runQuery ||
            !elementRef.current ||
            !intersectionObserver
        ) {
            return;
        }

        const htmlElement = elementRef.current;

        const onIntersection = entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                observer.unobserve(htmlElement);

                runQuery({
                    variables: { url: linkPath },
                    skip: !shouldPrefetch
                });
            }
        };
        const observer = new intersectionObserver(onIntersection);
        observer.observe(htmlElement);

        return () => {
            if (htmlElement) {
                observer.unobserve(htmlElement);
            }
        };
    }, [
        shouldPrefetch,
        elementRef,
        pageTypeCalled,
        linkPath,
        intersectionObserver,
        runQuery
    ]);

    return {
        ref: elementRef
    };
};

export default useLink;
