const parseName = name => name.replace(/\W|\d/g, '');

module.exports = (collection, routes) => {
    routes.forEach(route => {
        if (route.shimmer) {
            const ShimmerComponent = collection.addImport(
                `import ${parseName(route.name)}Shimmer from "${route.shimmer}"`
            );

            collection.insertAfterSource(
                'const collection = new Map();',
                `\ncollection.set('${route.pattern}', ${ShimmerComponent});`
            );
        }
    });
};
