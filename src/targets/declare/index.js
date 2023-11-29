module.exports = targets => {
    targets.declare({
        routeStylesheets: new targets.types.Sync(['routeStylesheets'])
    });
};
