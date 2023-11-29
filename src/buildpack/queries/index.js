const fs = require('fs');
const path = require('path');

/**
 * Normal `require` doesn't know what to do with .graphql files, so this helper function
 * simply imports their contents as a string.
 * @see https://github.com/apollographql/apollo-server/issues/1175#issuecomment-397257339.
 *
 * @param   {String} filepath - A relative path to a .graphql file to read.
 * @returns {String} - The contents of the file as a string.
 */
const requireGraphQL = filePath => {
    const absolutePath = path.resolve(__dirname, filePath);
    return stripComments(fs.readFileSync(absolutePath, { encoding: 'utf8' }));
};

const singleLineCommentRegex = /(^#.*\n)/gm;
const stripComments = string => {
    return string.replace(singleLineCommentRegex, '');
};

// Import all the build-time queries.
const getDefaultPickupStore = requireGraphQL(
    '../queries/getDefaultPickupStore.graphql'
);

const getPickupStoreBrands = requireGraphQL(
    '../queries/getPickupStoreBrands.graphql'
);

const getGtmSettings = requireGraphQL('../queries/getGtmSettings.graphql');

const getPickupStoreList = requireGraphQL(
    '../queries/getPickupStoreList.graphql'
);

// Export the queries for use by the rest of buildpack.
module.exports = {
    getDefaultPickupStore,
    getGtmSettings,
    getPickupStoreBrands,
    getPickupStoreList
};
