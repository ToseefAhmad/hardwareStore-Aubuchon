module.exports = routeComponent => {
    routeComponent.addImport('{ useMemo } from "react"');
    routeComponent.addImport(
        '{ useRouteFallbackShimmer} from "@app/hooks/useRouteFallbackShimmer"'
    );

    routeComponent.insertAfterSource(
        'const { pathname } = useLocation();',
        '\n    const { shimmer } = useRouteFallbackShimmer();'
    );

    const suspenseFallback = 'fallback={fullPageLoadingIndicator}';

    routeComponent.spliceSource({
        before: suspenseFallback,
        remove: suspenseFallback.length,
        insert: 'fallback={ shimmer }'
    });
};
