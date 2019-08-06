const graphql = require('graphql');
const { GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull } = graphql;
const { findSpec } = require('../controllers/SpecController');


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
			type: new GraphQLList(GraphQLString),
		},
		description: {
			type: GraphQLString
		},
		spec: {
			type: SpecType,
			resolve(parentValue, args) {
				return findSpec(args)
			}
		}
	})
});


const SpecIngredientType = new GraphQLObjectType({
  name: 'Spec_Ingredient',
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
    },
    subWith: {
      type: GraphQLString,
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
    directions: {
      type: GraphQLString,
    },
    riffOn: {
      type: SpecType,
      resolve(parentValue, args) {
        return findSpec({ id: parentValue.riffOn })
      }
    },
  })
});

const SpecIngredientInput = new GraphQLInputObjectType({
  name: 'Spec_Ingredient_Input',
  fields: () => ({
    quantity: {
      type: GraphQLFloat,
    },
    measure: {
      type: MeasureEnumType,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    canSub: {
      type: GraphQLBoolean
    },
    subWith: {
      type: GraphQLString
    }
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
    email: {
      type: GraphQLString,
    },
    token: {
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

module.exports = {
  MeasureEnumType,
  IngredientType,
  SpecIngredientType,
  SpecIngredientInput,
  SpecType,
  UserType
}