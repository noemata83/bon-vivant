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

const SpecIdInput = new GraphQLInputObjectType({
  name: 'Spec_ID_Input',
  fields: {
    $eq: {
      type: GraphQLString
    },
    $ne: {
      type: GraphQLString
    }
  }
})

const SpecNameInput = new GraphQLInputObjectType({
  name: 'Spec_Name_Input',
  fields: {
    $eq: {
      type: GraphQLString
    },
    $ne: {
      type: GraphQLString
    },
    contains: {
      type: GraphQLString
    },
    notContains: {
      type: GraphQLString
    },
    beginsWith: {
      type: GraphQLString
    }
  }
})

const IngredientInputType = new GraphQLInputObjectType({
  name: 'Ingredient_Filter_Input',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  }
})

const SpecIngredientFilterInput = new GraphQLInputObjectType({
  name: 'Spec_Ingredient_Filter_Input',
  fields: {
    contains: {
      type: new GraphQLList(IngredientInputType)
    },
    notContains: {
      type: new GraphQLList(IngredientInputType)
    }
  }
})

const SpecFilterInput = new GraphQLInputObjectType({
  name: 'Spec_Filter_Input',
  fields: {
    id: {
      type: SpecIdInput
    },
    name: {
      type: SpecNameInput
    },
    ingredients: {
      type: SpecIngredientFilterInput
    }
  }
})

module.exports = SpecFilterInput
