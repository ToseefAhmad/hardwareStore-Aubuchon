const interceptors = [
    require('./intercept/ecommerceEvents'),
];

module.exports = targets => {
    const builtins = targets.of('@magento/pwa-buildpack');

    builtins.specialFeatures.tap(flags => {
        flags[targets.name] = { esModules: true, cssModules: false, i18n: false };
    });

    interceptors.forEach(intercept => {
        intercept(targets);
    });
};
