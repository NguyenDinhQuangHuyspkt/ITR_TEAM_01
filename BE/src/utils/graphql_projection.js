const graphqlFields = require('graphql-fields');

function buildProjectionAndPopulate(info, options = {}) {
  const { rootFieldName, fieldWhitelist = [], nestedPopulate = {} } = options;
  const selections = graphqlFields(info) || {};

  // If the query returns a wrapper type (e.g., PaginatedPatients has patients + pagination)
  const root = rootFieldName ? selections[rootFieldName] || {} : selections;

  const selectedTopFields = Object.keys(root);
  const safeFields = fieldWhitelist.length
    ? selectedTopFields.filter((f) => fieldWhitelist.includes(f))
    : selectedTopFields;

  const projection = safeFields.length ? safeFields.join(' ') : null;

  // Populate selects: { relationField: whitelistArray }
  const populateSelects = {};
  for (const relationField of Object.keys(nestedPopulate)) {
    const allow = nestedPopulate[relationField] || [];
    const nested = root[relationField] || {};
    const nestedSelected = Object.keys(nested);
    const nestedSafe = allow.length
      ? nestedSelected.filter((f) => allow.includes(f))
      : nestedSelected;
    if (nestedSafe.length) {
      populateSelects[relationField] = nestedSafe.join(' ');
    }
  }

  return { projection, populateSelects };
}

module.exports = {
  buildProjectionAndPopulate,
};


