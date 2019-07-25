const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = graphql;
const { IngredientType, SpecIngredientInput, SpecType, UserType } = require('./types');

const { createIngredient, editIngredient, deleteIngredient } = require('../controllers/IngredientController');
const { createSpec } = require('../controllers/SpecController');

module.exports = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addIngredient: {
      type: IngredientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        spec: { type: GraphQLString }
      },
      resolve(parentValue, args ) {
        return createIngredient(args);
      }
    },
    editIngredient: {
      type: IngredientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
        spec: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return editIngredient(args.id, args);
      }
    },
    deleteIngredient: {
      type: IngredientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return deleteIngredient(args.id);
      }
    },
    createSpec: {
      type: SpecType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLString },
        description: { type: GraphQLString },
        ingredients: { type: new GraphQLNonNull(new GraphQLList(SpecIngredientInput)) },
        riffOn: { type: GraphQLString, }
      },
      async resolve(parentValue, args) {
        const newspec = await createSpec(args)
        return newspec;
      }
    }
  }
})
