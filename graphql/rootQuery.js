const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLList} = graphql;
const { findIngredient, fetchAllIngredients } = require('../controllers/IngredientController');
const { findSpec, fetchAllSpecs } = require('../controllers/SpecController');
const { UserType, SpecType, IngredientType } = require('./types');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return undefined
      }
    },
    spec: {
      type: SpecType,
      args: { id: { type: GraphQLString },
              name: { type: GraphQLString} },
      resolve(parentValue, args) {
        return findSpec(args)
      }
    },
    specs: {
      type: new GraphQLList(SpecType),
      resolve(parentValue, args) {
        return fetchAllSpecs()
      }
    },
    ingredient: {
      type: IngredientType,
      args: { id: { type: GraphQLString },
              name: { type: GraphQLString } },
      resolve(parentValue, args) {
        return findIngredient(args)
      }
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve(parentValue, args) {
        return fetchAllIngredients()
      }
    }
  }
});