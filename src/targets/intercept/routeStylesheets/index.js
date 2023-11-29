const { Targetables } = require('@magento/pwa-buildpack');

const RouteStylesheets = require('../../declare/routeStylesheets');

const routeMap = require('./map.json');

module.exports = targets => {
    const routeStylesheetMap = Targetables.using(targets);
    const routeStylesheets = new RouteStylesheets(routeStylesheetMap);

    routeMap.forEach(({ path, stylesheet }) => {
        routeStylesheets.add({ path, stylesheet });
    });
};
