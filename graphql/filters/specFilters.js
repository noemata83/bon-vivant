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
const filterInputTypes = {
  eq: {
    type: GraphQLString
  },
  ne: {
    type: GraphQLString
  },
  in: {
    type: new GraphQLList(GraphQLString)
  },
  nin: {
    type: new GraphQLList(GraphQLString)
  }
}
const SpecIdInput = new GraphQLInputObjectType({
  name: 'Spec_ID_Input',
  fields: {
    eq: {
      type: GraphQLString
    },
    ne: {
      type: GraphQLString
    }
  }
})

const SpecNameInput = new GraphQLInputObjectType({
  name: 'Spec_Name_Input',
  fields: {
    eq: {
      type: GraphQLString
    },
    ne: {
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

const FamilyNameFilterInput = new GraphQLInputObjectType({
  name: 'Ingredient_Family_Name_Input',
  fields: {
    ...filterInputTypes
  }
})

const IngredientFamilyFilterInput = new GraphQLInputObjectType({
  name: 'Ingredient_Family_Filter_Input',
  fields: {
    name: {
      type: FamilyNameFilterInput
    }
  }
})

const IngredientNameFilterInput = new GraphQLInputObjectType({
  name: 'Ingredient_Name_Filter_Input',
  fields: {
    ...filterInputTypes
  }
})

const SpecIngredientFilterInput = new GraphQLInputObjectType({
  name: 'Spec_Ingredient_Filter_Input',
  fields: {
    name: {
      type: IngredientNameFilterInput
    },
    family: {
      type: IngredientFamilyFilterInput
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
      type: new GraphQLInputObjectType({
        name: 'Spec_Ingredients_Filter_Input',
        fields: {
          ingredient: {
            type: SpecIngredientFilterInput
          }
        }
      })
    }
  }
})

module.exports = SpecFilterInput
