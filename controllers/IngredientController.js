const Ingredient = require('../models/Ingredient').model
const IngredientType = require('../models/IngredientType')
const ObjectId = require('mongoose').Types.ObjectId

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
  // ingredient.family = ingredient.family.map(async ingType => {
  //   const foundType = await IngredientType.findOne({ name: ingType })
  //   return foundType._id
  // })
  // await Promise.all(ingredient.family).then(completed => {
  //   ingredient.family = completed
  // })
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
  deleteIngredientType,
  createIngredient,
  findIngredient,
  fetchAllIngredients,
  editIngredient,
  deleteIngredient
}
