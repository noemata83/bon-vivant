const { castToQueryOps } = require('./utility')

const OPERATORS = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin']
module.exports = function(rawFilter, base) {
  const castQuery = castToQueryOps(rawFilter)
  return buildUpQuery({}, base, castQuery[base])
}

const buildUpQuery = (base, path, src) => {
  // start with
  for (let key in src) {
    // first, determine if the key has grandchildren.
    if (typeof src[key] !== 'object' || src[key] == null) {
      return base
    }
    if (
      Object.values(src[key]).some(val =>
        Object.values(val).every(v => v === Object(v))
      )
    ) {
      path += `.${key}`
      base = {
        ...base,
        ...buildUpQuery({ ...base }, path, src[key])
      }
      // now, determine if the key comprehends a query
    } else {
      if (Object.keys(src[key]).every(val => OPERATORS.includes(val))) {
        base.path = path
        base.match = { [key]: { ...src[key] } }
      } else {
        path = key
        base['populate'] = buildUpQuery({ ...base }, path, src[key])
      }
    }
  }
  return base
}
