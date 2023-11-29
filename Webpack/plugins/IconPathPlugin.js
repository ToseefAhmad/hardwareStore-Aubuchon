const path = require("path");
const debug = require('@magento/pwa-buildpack/lib/util/debug').makeFileLogger(__filename);
const walk = require('@magento/pwa-buildpack/lib/util/klaw-bound-fs');
const InjectPlugin = require('webpack-inject-plugin').default;

class IconPathPlugin
{
    iconDir = path.join('assets', 'icons');

    constructor(opts) {
        this.opts = opts;
    }

    apply(compiler) {
        this.compiler = compiler;
        this.injectAssetPaths();
    }

    injectAssetPaths() {
        debug('Reading icon paths and injecting them into build');
        new InjectPlugin(() => this.buildAssetPathMap()).apply(this.compiler)
    }

    async buildAssetPathMap() {
        const { context } = this.opts;
        const iconDirPath = path.join(context, this.iconDir);
        const iconPaths = await this.resolveAssets(iconDirPath);

        return `;globalThis.__iconPaths__ = ${JSON.stringify(iconPaths)}`;
    }

    resolveAssets(assetPath) {
        const { inputFileSystem } = this.compiler;
        const { context } = this.opts;

        return new Promise(resolve => {
            const paths = [];
            const done = () => resolve(paths);

            walk(assetPath, { fs: inputFileSystem })
                .on('readable', function() {
                    let item;

                    while ((item = this.read())) {
                        if (item.stats.isDirectory()) {
                            paths.push(path.relative(context, item.path));
                        }
                    }
                })
                .on('error', done)
                .on('end', done);
        });
    }
}

module.exports = IconPathPlugin;
