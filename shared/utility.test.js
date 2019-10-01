const { castToQuery } = require('./utility')

test('converts nested operator keywords to mongodb operators', () => {
  const uncastQuery = {
    name: {
      eq: 'Funny'
    },
    ingredients: {
      family: {
        in: ['Bourbon', 'Rye']
      }
    }
  }
  expect(castToQuery(uncastQuery)).toEqual({
    name: {
      $eq: 'Funny'
    },
    ingredients: {
      family: {
        $in: ['Bourbon', 'Rye']
      }
    }
  })
})
