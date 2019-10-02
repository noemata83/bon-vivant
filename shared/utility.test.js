const { castToQueryOps } = require('./utility')

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
  expect(castToQueryOps(uncastQuery)).toEqual({
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
