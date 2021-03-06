const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = graphql
const {
  IngredientType,
  TypeOfIngredientType,
  SpecIngredientInput,
  SpecType,
  UserType
} = require('./types')

const {
  registerIngredientType,
  updateIngredientType,
  deleteIngredientType,
  createIngredient,
  editIngredient,
  deleteIngredient
} = require('../controllers/IngredientController')
const {
  createSpec,
  editSpec,
  deleteSpec
} = require('../controllers/SpecController')
const {
  signUp,
  deleteUser,
  login,
  findUserById,
  addIngredientToShelf,
  addSpecToBook
} = require('..//controllers/UserController')

const AuthType = new GraphQLObjectType({
  name: 'AuthToken',
  fields: {
    token: {
      type: GraphQLString
    }
  }
})

module.exports = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    registerIngredientType: {
      type: TypeOfIngredientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        parent: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return registerIngredientType(args)
      }
    },
    deleteIngredientType: {
      type: TypeOfIngredientType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return deleteIngredientType(args.id)
      }
    },
    addIngredient: {
      type: IngredientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
        family: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        description: { type: GraphQLString },
        spec: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return createIngredient(args)
      }
    },
    editIngredient: {
      type: IngredientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        family: { type: new GraphQLList(GraphQLString) },
        type: { type: new GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
        spec: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return editIngredient(args.id, args)
      }
    },
    deleteIngredient: {
      type: IngredientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return deleteIngredient(args.id)
      }
    },
    addIngredientToShelf: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, { user }) {
        if (!user) {
          throw new Error('You are not logged in.')
        }
        return addIngredientToShelf(user.id, args.id)
      }
    },
    createSpec: {
      type: SpecType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        slug: { type: GraphQLString },
        author: { type: GraphQLString },
        description: { type: GraphQLString },
        directions: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: {
          type: new GraphQLNonNull(new GraphQLList(SpecIngredientInput))
        },
        riffOn: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const newspec = await createSpec(args)
        return newspec
      }
    },
    editSpec: {
      type: SpecType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        author: { type: GraphQLString },
        description: { type: GraphQLString },
        directions: { type: GraphQLString },
        ingredients: { type: new GraphQLList(SpecIngredientInput) },
        riffOn: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return editSpec(args.id, args)
      }
    },
    deleteSpec: {
      type: SpecType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return deleteSpec(args.id)
      }
    },
    addSpecToBook: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, { user }) {
        if (!user) {
          throw new Error('You are not logged in.')
        }
        return addSpecToBook(user.id, args.id)
      }
    },
    signUp: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args, { res }) {
        return signUp(args.username, args.password, args.email, res)
      }
    },
    login: {
      type: AuthType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, args, { res }) {
        return login(args.username, args.password, res)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return deleteUser(args.id)
      }
    }
  }
})
