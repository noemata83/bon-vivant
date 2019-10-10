const Ingredient = require('../models/Ingredient').model
const IngredientType = require('../models/IngredientType').model
const ObjectId = require('mongoose').Types.ObjectId
const Spec = require('../models/Spec')
const User = require('../models/User')

const registerIngredientType = async ingredientType => {
  const newIngredientType = await IngredientType.create(ingredientType)
  return newIngredientType
}

const fetchAllIngredientTypes = () => {
  return IngredientType.find()
}

const fetchOneIngredientType = id => {
  return IngredientType.findById(id)
}

const updateIngredientType = async (id, update) => {
  return IngredientType.findByIdAndUpdate(id, update, { new: true })
}

const deleteIngredientType = async id => {
  const ingredientsWithRefs = await Ingredient.find({
    family: [{ _id: ObjectId(id) }]
  })
  ingredientsWithRefs.forEach(ingredient => {
    console.log(ingredient.family)
    ingredient.family = ingredient.family.filter(type => type.id !== id)
    ingredient.save()
  })
  return IngredientType.findByIdAndRemove(id)
}

const createIngredient = async ingredient => {
  ingredient.family = ingredient.family.map(async familyId => {
    const family = await IngredientType.findById(familyId)
    return family
  })
  const completed = await Promise.all(ingredient.family)
  ingredient.family = completed
  const newIngredient = await Ingredient.create(ingredient)
  return newIngredient
}

const fetchAllIngredients = () => {
  return Ingredient.find()
}

const findIngredient = ({ id, slug, name }) => {
  if (id) {
    return Ingredient.findById(id)
  } else if (slug) {
    return Ingredient.findOne({ slug })
  } else {
    return Ingredient.findOne({ name })
  }
}

const editIngredient = async (id, update) => {
  const updatedIngredient = await Ingredient.findByIdAndUpdate(id, update, {
    new: true
  })
  await Spec.updateMany(
    {
      ingredients: {
        $elemMatch: {
          'ingredient._id': updatedIngredient.id
        }
      }
    },
    {
      $set: {
        'ingredients.$[a].ingredient': updatedIngredient
      }
    },
    {
      arrayFilters: [{ 'a.ingredient._id': updatedIngredient.id }]
    }
  ).exec()
  await User.updateMany(
    {
      shelf: {
        $elemMatch: {
          _id: updatedIngredient.id
        }
      }
    },
    {
      $set: {
        'shelf.$[a]': updatedIngredient
      }
    },
    {
      arrayFilters: [{ 'a._id': updatedIngredient.id }]
    }
  )
  return updatedIngredient
}

const deleteIngredient = async id => {
  const ingredientToDelete = await Ingredient.findByIdAndDelete(id)
  await Spec.deleteMany({
    ingredients: {
      $elemMatch: {
        'ingredient._id': this.id
      }
    }
  })
  await User.updateMany(
    {
      shelf: {
        $elemMatch: {
          _id: this.id
        }
      }
    },
    {
      $pullAll: {
        'shelf._id': this.id
      }
    }
  )
  return ingredientToDelete
}

module.exports = {
  registerIngredientType,
  updateIngredientType,
  fetchAllIngredientTypes,
  fetchOneIngredientType,
  deleteIngredientType,
  createIngredient,
  findIngredient,
  fetchAllIngredients,
  editIngredient,
  deleteIngredient
}
