const interceptors = [
    require('./intercept/contactUsEvents'),
    require('./intercept/customerEvents'),
    require('./intercept/ecommerceEvents'),
    require('./intercept/generalEvents'),
    require('./intercept/productEvents'),
    require('./intercept/storelocatorEvents')
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
