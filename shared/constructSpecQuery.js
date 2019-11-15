const { castToQueryOps } = require("./utility");

module.exports = {
  constructSpecQuery: function(rawFilter) {
    return constructSpecQuery(rawFilter);
  }
};

function constructSpecQuery(query) {
  const queryWithOps = castToQueryOps(query);
  return castEmbedded(queryWithOps);
}

function castEmbedded(query) {
  const newQuery = {};
  for (let k in query) {
    const value = query[k];
    if (k == "ingredient") {
      k = "ingredients.ingredient.name";
    } else if (k == "ingredientType") {
      k = "ingredients.ingredient.family.name";
    }
    newQuery[k] = value;
  }
  return newQuery;
}
