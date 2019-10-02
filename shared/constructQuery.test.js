const constructQuery = require('./constructQuery')

test('constructs a valid mongoose populate object from a GraphQL query', () => {
  const graphQlQuery = {
    ingredients: {
      ingredient: {
        name: {
          $eq: 'Test Cocktail'
        },
        family: {
          name: {
            $eq: 'Amaro'
          }
        }
      }
    }
  }
  expect(constructQuery(graphQlQuery, 'ingredients')).toEqual({
    path: 'ingredients.ingredient',
    match: { name: { $eq: 'Test Cocktail' } },
    populate: {
      path: 'family',
      match: { name: { $eq: 'Amaro' } }
    }
  })
})
