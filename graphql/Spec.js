const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLList } = graphql;
const MeasureEnumType = require('./MeasureEnum');
const IngredientType = require('./Ingredient');

const SpecIngredientType = new GraphQLObjectType({
  name: 'Spec Ingredient',
  fields: () => ({
    quantity: {
      type: GraphQLFloat,
    },
    measure: {
      type: MeasureEnumType
    },
    ingredient: {
      type: IngredientType,
    },
    canSub: {
      type: GraphQLBoolean
    }
  })
})

const SpecType = new GraphQLObjectType({
  name: 'Spec',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    ingredients: {
      type: GraphQLList(SpecIngredientType)
    },
    riffOn: {
      type: SpecType
    },
  })
});

module.exports = SpecType;