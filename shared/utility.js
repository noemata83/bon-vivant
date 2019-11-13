const OPERATORS = ["eq", "gt", "gte", "in", "lt", "lte", "ne", "nin"];

function castToQueryOps(obj) {
  const newObj = {};
  for (let k in obj) {
    if (
      typeof obj[k] == "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      newObj[k] = castToQueryOps(obj[k]);
    } else {
      if (OPERATORS.includes(k)) {
        newObj[`$${k}`] = obj[k];
      } else {
        newObj[k] = obj[k];
      }
    }
  }
  return newObj;
}

function castEmbedded(obj) {
  const newObj = {};
  for (let k in obj) {
    if (
      typeof obj[k] == "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      const newK = k.replace(/_/g, ".");
      newObj[newK] = castEmbedded(obj[k]);
    } else {
      const _k = k.replace(/_/g, ".");
      newObj[_k] = obj[k];
    }
  }
  return newObj;
}

module.exports = {
  purgeDuplicates: array => {
    return Array.from(new Set(array));
  },
  castToQueryOps,
  OPERATORS,
  castEmbedded
};
