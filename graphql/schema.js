const graphql = require('graphql')
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean
} = graphql;

const { createIngredient, findIngredient } = require('../controllers/IngredientController');

const MeasureEnumType = new GraphQLEnumType({
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
});

const IngredientType = new GraphQLObjectType({
	name: 'Ingredient',
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		spec: {
			type: SpecType,
			resolve(parentValue, args) {
				return {}
			}
		}
	})
});


const SpecIngredientType = new GraphQLObjectType({
  name: 'SpecIngredient',
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
});


const SpecType = new GraphQLObjectType({
  name: 'Spec',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    ingredients: {
      type: new GraphQLList(SpecIngredientType)
    },
    riffOn: {
      type: SpecType
    },
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    book: {
      type: new GraphQLList(SpecType)
    },
    shelf: {
      type: new GraphQLList(IngredientType)
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
    },
    ingredient: {
      type: IngredientType,
      args: { id: { type: GraphQLString },
              name: { type: GraphQLString } },
      resolve(parentValue, args) {
        return findIngredient(args)
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addIngredient: {
      type: IngredientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString ) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        spec: { type: GraphQLString }
      },
      resolve(parentValue, args ) {
        return createIngredient(args);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery, mutation
});