const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = graphql;
const { IngredientType, SpecIngredientInput, SpecType, UserType } = require('./types');

const { createIngredient } = require('../controllers/IngredientController');
const { createSpec, findSpec } = require('../controllers/SpecController');

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
        console.log(newspec.ingredients[0]);
        return newspec;
      }
    }
  }
})
