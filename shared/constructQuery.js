const { castToQueryOps, castEmbedded } = require("./utility");

module.exports = {
  constructSpecQuery: function(rawFilter) {
    return constructSpecQuery(rawFilter);
  }
};

function constructSpecQuery(query) {
  const queryWithOps = castToQueryOps(query);
  return castEmbedded(queryWithOps);
}
