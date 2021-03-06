const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql
const {
  findIngredient,
  fetchAllIngredients,
  fetchAllIngredientTypes
} = require('../controllers/IngredientController')
const {
  findSpec,
  fetchAllSpecs,
  getAvailableSpecs
} = require('../controllers/SpecController')
const { getAllUsers, getUserById } = require('../controllers/UserController')
const {
  UserType,
  SpecType,
  IngredientType,
  TypeOfIngredientType,
  MeasureListType
} = require('./types')
const SpecFilterInput = require('./filters/specFilters')
const logger = require('../shared/logger')
const MEASURES = require('../models/measure')

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
      args: {
        id: { type: GraphQLString },
        slug: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return findSpec(args)
      }
    },
    specs: {
      type: new GraphQLList(SpecType),
      args: {
        filter: {
          type: SpecFilterInput
        },
        limit: {
          type: GraphQLInt
        }
      },
      resolve(parentValue, args) {
        return fetchAllSpecs(args.filter, args.limit, ['ingredients'])
      }
    },
    ingredient: {
      type: IngredientType,
      args: {
        id: { type: GraphQLString },
        slug: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return findIngredient(args)
      }
    },
    ingredientTypes: {
      type: new GraphQLList(TypeOfIngredientType),
      resolve(parentValue, args) {
        return fetchAllIngredientTypes()
      }
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve(parentValue, args) {
        return fetchAllIngredients()
      }
    },
    measures: {
      type: new GraphQLList(MeasureListType),
      resolve(parentValue, args) {
        return [...MEASURES]
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return getAllUsers()
      }
    },
    me: {
      type: UserType,
      resolve(_, args, { user }) {
        if (!user) {
          throw new Error('You are not authenticated!')
        }
        return getUserById(user.id)
      }
    },
    whatICanMake: {
      type: new GraphQLList(SpecType),
      resolve(_, args, { user }) {
        if (!user) {
          throw new Error('You are not authenticated!')
        }
        return getAvailableSpecs(user.id)
        // return true;
      }
    }
  }
})
