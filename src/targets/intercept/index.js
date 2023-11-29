/**
 * List of interceptors
 */
const interceptors = [
    require('./events'),
    require('./upward'),
    require('./routes'),
    require('./routeStylesheets')
];

/**
 * Register interceptors
 * @param targets
 */
module.exports = targets => {
    interceptors.forEach(interceptor => {
        interceptor(targets);
    });
};
