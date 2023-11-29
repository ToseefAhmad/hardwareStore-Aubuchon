const targets = {
    prod: [
        '> 0.05%',
        'not dead',
        'not android <= 4.4.3',
        'not chrome <= 76',
        'not firefox <= 52',
        'not ios <= 12.1',
        'not safari <= 12',
        'safari >= 12.1',
        'not samsung <= 13'
    ]
}

module.exports = {
    presets: [['@magento/peregrine', { modules: false, targets }]],
    plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        'lodash'
    ]
};
