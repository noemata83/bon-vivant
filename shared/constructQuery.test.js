const constructQuery = require('./constructQuery')

test('constructs a valid mongoose populate object for a shallow GraphQL query', () => {
  const graphQlQuery = {
    name: {
      ne: ''
    },
    ingredients: {
      ingredient: {
        name: {
          eq: 'Buffalo Trace Bourbon'
        }
      }
    }
  }
  expect(constructQuery(graphQlQuery)[0]).toEqual({
    name: {
      $ne: ''
    }
  })
  expect(constructQuery(graphQlQuery)[1]).toEqual({
    path: 'ingredients.ingredient',
    match: { name: { $eq: 'Buffalo Trace Bourbon' } }
  })
  // expect(constructQuery(fullQuery, 'ingredients')).toEqual({
  //   path: 'ingredients.ingredient',
  //   match: {
  //     name: {
  //       $in: ['Hullabaloo']
  //     }
  //   }
  // })
})

test('returns a valid query for a deeply nested filter object', () => {
  const fullQuery = {
    ingredients: {
      ingredient: {
        family: {
          name: {
            $in: ['Hullabaloo']
          }
        }
      }
    }
  }

  expect(constructQuery(fullQuery)[1]).toEqual({
    path: 'ingredients.ingredient',
    populate: {
      path: 'family',
      match: { name: { $in: ['Hullabaloo'] } }
    }
  })
})
