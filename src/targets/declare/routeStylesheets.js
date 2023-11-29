class RouteStylesheets {
    constructor(routeStylesheetMap) {
        const registry = this;

        this._module = routeStylesheetMap.esModule({
            module: 'src/talons/RouteStylesheets/collection.js',
            publish(targets) {
                targets.routeStylesheets.call(registry);
            }
        });
    }

    static parseChunkName(path = '') {
        return (path.startsWith('/') ? path.slice(1) : path).replace(
            /\//g,
            '_'
        );
    }

    static buildPromiseFn(path, stylesheet) {
        return `() => { import(/* webpackChunkName: "${RouteStylesheets.parseChunkName(
            path
        )}" */ '${stylesheet}') }`;
    }

    add({ path, stylesheet }) {
        this._module.insertAfterSource(
            'const collection = [];\n',
            `collection.push({
                path: "${path}",
                loadStylesheet: ${RouteStylesheets.buildPromiseFn(
                    path,
                    stylesheet
                )}
            });\n`
        );
    }
}

module.exports = RouteStylesheets;
