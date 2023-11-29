const { merge } = require('lodash');

const { Targetables } = require('@magento/pwa-buildpack');

/**
 * Map new routes for the project
 * File should work the same as @magento/venia-ui/lib/defaultRoutes.json
 */
const buildRouteShimmerCollection = require('./buildRouteShimmerCollection');
const modifyRouteComponent = require('./modifyRouteComponent');

const routes = [
    ...require('@magento/venia-ui/lib/defaultRoutes.json'),
    ...require('./routes.json')
];

module.exports = targets => {
    targets
        .of('@magento/venia-ui')
        .routes.tap(currentRoutes => [...currentRoutes, ...routes]);

    const targetables = Targetables.using(targets);

    modifyRouteComponent(
        targetables.reactComponent(
            '@magento/venia-ui/lib/components/Routes/routes.js'
        )
    );

    buildRouteShimmerCollection(
        targetables.reactComponent(
            'src/hooks/useRouteFallbackShimmer/collection.js'
        ),
        routes
    );

    // Provide existing routes to UPWARD
    const routeList = routes.map(route => route.pattern);
    targets.of('@magento/pwa-buildpack').transformUpward.tap(definitions => {
        merge(definitions, {
            veniaPageType: {
                inline: {
                    data: {
                        pwaPaths: routeList.join(',')
                    }
                }
            }
        });
    });
};
