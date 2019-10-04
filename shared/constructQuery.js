const { castToQueryOps } = require('./utility')

const OPERATORS = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin']
module.exports = function(rawFilter) {
  const castQuery = castToQueryOps(rawFilter)
  return constructQueryParams(castQuery)
}

const constructQueryParams = queryObject => {
  let filter = {}
  let populate = {}
  Object.keys(queryObject).forEach(key => {
    if (isKeyAFilter(queryObject, key)) {
      filter = {
        ...filter,
        [key]: { ...queryObject[key] }
      }
    } else {
      populate = {
        ...populate,
        ...buildUpQuery({}, key, queryObject[key])
      }
    }
  })
  return [filter, populate]
}

const buildUpQuery = (obj, path, src, level = 0) => {
  // start with
  for (let key in src) {
    // first, determine if the key has grandchildren.
    if (isKeyNotObject(src, key)) {
      return obj
    }
    if (
      doesKeyHaveGreatGrandchildren(src, key) ||
      (level == 0 && isFilterGrandparent(src, key))
    ) {
      path += `.${key}`
      obj = {
        ...obj,
        path,
        ...buildUpQuery({ ...obj }, path, src[key], ++level)
      }
      // now, determine if the key comprehends a query
    } else {
      if (isKeyAFilter(src, key)) {
        obj.path = path
        obj.match = { [key]: { ...src[key] } }
      } else {
        path = key
        obj['populate'] = buildUpQuery({ ...obj }, path, src[key], ++level)
      }
    }
  }
  return obj
}

const doesKeyHaveGreatGrandchildren = (src, key) =>
  Object.values(src[key]).some(val =>
    Object.values(val).every(v => v === Object(v) && !Array.isArray(v))
  )

exports.doesKeyHaveGreatGrandchildren = doesKeyHaveGreatGrandchildren

const isFilterGrandparent = (src, key) =>
  Object.keys(src[key]).some(val => {
    return Object.keys(src[key][val]).every(v => {
      return OPERATORS.includes(v)
    })
  })
const isKeyAFilter = (src, key) =>
  Object.keys(src[key]).every(val => OPERATORS.includes(val))

const isKeyNotObject = (src, key) =>
  typeof src[key] !== 'object' || src[key] == null
