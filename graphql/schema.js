const graphql = require('graphql')
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull,
} = graphql;
const IngredientType = require('./Ingredient');
const SpecType = require('./Spec');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    book: {
      type: GraphQLList(SpecType)
    },
    shelf: {
      type: GraphQLList(IngredientType)
    }
  })
});

const RootQuery = new GraphQLObjectType({
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
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return undefined
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});