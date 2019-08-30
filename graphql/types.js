const graphql = require('graphql')
const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql
const { findSpec } = require('../controllers/SpecController')
const { getUserById } = require('../controllers/UserController')
const MEASURES = require('../models/measure')

const MeasureEnumType = new GraphQLEnumType({
  name: 'MeasureEnum',
  values: MEASURES.reduce((acc, ms, i) => {
    return {
      ...acc,
      [ms.abbreviation]: {
        value: i
      }
    }
  }, {})
})

const MeasureListType = new GraphQLObjectType({
  name: 'Measure',
  fields: {
    abbreviation: {
      type: GraphQLString
    },
    plural: {
      type: GraphQLString
    },
    singular: {
      type: GraphQLString
    }
  }
})

const IngredientType = new GraphQLObjectType({
  name: 'Ingredient',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    type: {
      type: new GraphQLList(GraphQLString)
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
})

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    rating: {
      type: GraphQLFloat
    },
    author: {
      type: UserType,
      resolve(parentValue, args) {
        return getUserById(parentValue.id)
      }
    },
    comment: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    }
  })
})

const SpecIngredientType = new GraphQLObjectType({
  name: 'Spec_Ingredient',
  fields: () => ({
    quantity: {
      type: GraphQLFloat
    },
    measure: {
      type: MeasureEnumType
    },
    ingredient: {
      type: IngredientType
    },
    canSub: {
      type: GraphQLBoolean
    },
    subWith: {
      type: GraphQLString
    }
  })
})

const SpecType = new GraphQLObjectType({
  name: 'Spec',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    ingredients: {
      type: new GraphQLList(SpecIngredientType)
    },
    directions: {
      type: GraphQLString
    },
    riffOn: {
      type: SpecType,
      resolve(parentValue, args) {
        return findSpec({ id: parentValue.riffOn })
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType)
    }
  })
})

const SpecIngredientInput = new GraphQLInputObjectType({
  name: 'Spec_Ingredient_Input',
  fields: () => ({
    quantity: {
      type: GraphQLFloat
    },
    measure: {
      type: MeasureEnumType
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
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    book: {
      type: new GraphQLList(SpecType)
    },
    shelf: {
      type: new GraphQLList(IngredientType)
    }
  })
})

module.exports = {
  MeasureEnumType,
  MeasureListType,
  IngredientType,
  SpecIngredientType,
  SpecIngredientInput,
  SpecType,
  UserType
}
