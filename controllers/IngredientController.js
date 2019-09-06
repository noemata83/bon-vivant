const Ingredient = require('../models/Ingredient').model
const IngredientType = require('../models/IngredientType')

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

const createIngredient = async ingredient => {
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

const editIngredient = (id, update) => {
  return Ingredient.findByIdAndUpdate(id, update, { new: true })
}

const deleteIngredient = id => {
  return Ingredient.findByIdAndDelete(id)
}

module.exports = {
  registerIngredientType,
  updateIngredientType,
  fetchAllIngredientTypes,
  fetchOneIngredientType,
  createIngredient,
  findIngredient,
  fetchAllIngredients,
  editIngredient,
  deleteIngredient
}
