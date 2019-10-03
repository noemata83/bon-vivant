const constructQuery = require('./constructQuery')

test('constructs a valid mongoose populate object from a GraphQL query', () => {
  const graphQlQuery = {
    name: {
      ne: 'Test Cocktail'
    },
    id: {
      eq: '3'
    },
    ingredients: {
      ingredient: {
        name: {
          eq: 'Test Cocktail'
        },
        family: {
          name: {
            eq: 'Amaro'
          }
        }
      }
    }
  }
  expect(constructQuery(graphQlQuery)[0]).toEqual({
    name: {
      $ne: 'Test Cocktail'
    },
    id: {
      $eq: '3'
    }
  })
  expect(constructQuery(graphQlQuery)[1]).toEqual({
    path: 'ingredients.ingredient',
    match: { name: { $eq: 'Test Cocktail' } },
    populate: {
      path: 'family',
      match: { name: { $eq: 'Amaro' } }
    }
  })

  // const fullQuery = {
  //   ingredients: {
  //     ingredient: {
  //       name: {
  //         $in: ['Hullabaloo']
  //       }
  //     }
  //   }
  // }

  // expect(constructQuery(fullQuery, 'ingredients')).toEqual({
  //   path: 'ingredients.ingredient',
  //   match: {
  //     name: {
  //       $in: ['Hullabaloo']
  //     }
  //   }
  // })
})
