const { Targetables } = require("@magento/pwa-buildpack");

const EventMapBuilder = require('./EventMapBuilder');

module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(flags => {
        flags[targets.name] = { esModules: true, cssModules: false, i18n: false };
    });

    const EventTargetable = Targetables.using(targets);

    new EventMapBuilder(EventTargetable);
};
