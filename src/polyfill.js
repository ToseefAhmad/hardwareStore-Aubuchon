import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import ResizeObserver from 'resize-observer-polyfill';

if (!('ResizeObserver' in globalThis)) {
    globalThis.ResizeObserver = ResizeObserver;
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = require('string.prototype.replaceall');
}
