const graphql = require('graphql')
const { GraphQLEnumType } = graphql

module.exports = new GraphQLEnumType({
  name: 'MeasureEnum',
  values: {
    OZ: {
      value: 0,
    },
    ML: {
      value: 1,
    },
    TSP: {
      value: 2,
    },
    TBSP: {
      value: 3,
    },
    DS: {
      value: 4,
    },
    DR: {
      value: 5,
    },
    PN: {
      value: 6
    },
    BSP: {
      value: 7,
    },
    SPL: {
      value: 8,
    },
    RINSE: {
      value: 9,
    },
    TWST: {
      value: 10,
    },
    SPG: {
      value: 11
    },
    SLI: {
      value: 12
    },
    WDG: {
      value: 13,
    },
    CUBE: {
      value: 14,
    }
  }
})