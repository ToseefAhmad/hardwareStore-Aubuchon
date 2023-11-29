export const EASING_NAMES = {
    linear: 'linear', // no easing, no acceleration
    easeInQuad: 'easeInQuad', // accelerating from zero velocity
    easeOutQuad: 'easeOutQuad', // decelerating to zero velocity
    easeInOutQuad: 'easeInOutQuad', // acceleration until halfway, then deceleration
    easeInCubic: 'easeInCubic', // accelerating from zero velocity
    easeOutCubic: 'easeOutCubic', // decelerating to zero velocity
    easeInOutCubic: 'easeInOutCubic', // acceleration until halfway, then deceleration
    easeInQuart: 'easeInQuart', // accelerating from zero velocity
    easeOutQuart: 'easeOutQuart', // decelerating to zero velocity
    easeInOutQuart: 'easeInOutQuart', // acceleration until halfway, then deceleration
    easeInQuint: 'easeInQuint', // accelerating from zero velocity
    easeOutQuint: 'easeOutQuint', // decelerating to zero velocity
    easeInOutQuint: 'easeInOutQuint' // acceleration until halfway, then deceleration
};

export const EASING_FUNCTIONS = {
    [EASING_NAMES.linear]: t => t,
    [EASING_NAMES.easeInQuad]: t => t * t,
    [EASING_NAMES.easeOutQuad]: t => t * (2 - t),
    [EASING_NAMES.easeInOutQuad]: t =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    [EASING_NAMES.easeInCubic]: t => t * t * t,
    [EASING_NAMES.easeOutCubic]: t => --t * t * t + 1,
    [EASING_NAMES.easeInOutCubic]: t =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    [EASING_NAMES.easeInQuart]: t => t * t * t * t,
    [EASING_NAMES.easeOutQuart]: t => 1 - --t * t * t * t,
    [EASING_NAMES.easeInOutQuart]: t =>
        t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    [EASING_NAMES.easeInQuint]: t => t * t * t * t * t,
    [EASING_NAMES.easeOutQuint]: t => 1 + --t * t * t * t * t,
    [EASING_NAMES.easeInOutQuint]: t =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
};
