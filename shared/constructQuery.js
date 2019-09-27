/*
{
  id: {
    eq:
    ne:
  },
  name: {
    eq:
    ne:
    contains:
    notContains:
    beginsWith:
  },
  ingredients: {
    contains: [{
      name:
      id:
    }],
    notContains: [{
      name:
      id:
    }]
  },
  ingredientTypes: {
    contains: [{
      name
      id
    }]
  }
}

TARGET:
{
  id: {
    $eq: string | regexp 
    $ne: string
  }
  name: {
    $eq: string | regexp
    $ne: string
  },
  'ingredients.ingredient.id': {
    { $in: rawFilter.ingredients.contains,
      $nin: rawFilter.ingredients.notContains },
}
  }
  'ingredients.ingredient.name': { $in: rawFilter.ingredients.contains,
                              $nin: rawFilter.ingredients.notContains },
  'ingredients.ingredient.family.name': { $in: rawFilter.ingredientTypes.contains,
                                          $nin: rawFilter.ingredientTypes.notContains }
  'ingredients.ingredient.family.id': { $in: rawFilter.ingredientTypes.contains,
                                          $nin: rawFilter.ingredientTypes.notContains }
  }
}
*/

module.exports = function(rawFilter) {
  const filter = {}
  if (rawFilter.id) {
    filter.id = {}
    if (rawFilter.id.eq) filter.id['$eq'] = rawFilter.id.eq
    if (rawFilter.id.ne) filter.id['$ne'] = rawFilter.id.ne
  }
  if (rawFilter.name) {
    filter.name = {}
    if (rawFilter.name.eq) {
      filter.id['$eq'] = rawFilter.name.eq
    } else if (rawFilter.name.contains) {
      filter.id['$eq'] = new RegExp(rawFilter.name.contains)
    } else if (rawFilter.name.beginsWith) {
      filter.id['$eq'] = new RegExp('$' + rawFilter.name.beginsWith)
    }
    if (rawFilter.name.ne) {
      filter.id['$ne'] = rawFilter.name.ne
    } else if (rawFilter.name.notContains) {
      filter.id['$ne'] = new RegExp(rawFilter.name.notContains)
    }
  }
  if (rawFilter.ingredients) {
    if (
      rawFilter.ingredients.contains &&
      rawFilter.ingredients.contains.length > 0
    ) {
      // filter['ingredients.ingredient.id'] = {}
      filter['ingredients.ingredient'] = {}
      filter['ingredients.ingredient']['$in'] = rawFilter.ingredients.contains
    } else if (
      rawFilter.ingredients.notContains &&
      rawFilter.ingredients.notContains.length > 0
    ) {
      filter['ingredients.ingredient'] = {}
      filter['ingredients.ingredient']['$nin'] = [
        ...rawFilter.ingredients.notContains
      ]
    }
  }
  if (rawFilter.ingredientTypes) {
    if (
      rawFilter.ingredientTypes.contains &&
      rawFilter.ingredientTypes.contains.length > 0
    ) {
      filter['ingredients.ingredient.family.name']['$in'] = [
        ...rawFilter.ingredientTypes.contains
      ]
    } else if (
      rawFilter.ingredients.notContains &&
      rawFilter.ingredients.notContains.length > 0
    ) {
      filter['ingredient.ingredient.family.name']['$nin'] = [
        ...rawFilter.ingredientTypes.notContains
      ]
    }
  }
  console.log(filter)
  return filter
}
