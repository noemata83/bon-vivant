const Ingredient = require('../models/Ingredient').model;

const createIngredient = async (ingredient) => {
  const newIngredient = await Ingredient.create(ingredient);
  return newIngredient;
}

const fetchAllIngredients = () => {
  return Ingredient.find();
}

const findIngredient = ({ id, slug, name }) => {
  if (id) {
    return Ingredient.findById(id);
  } else if (slug) {
    return Ingredient.findOne({ slug });
  } else {
    return Ingredient.findOne({ name })
  }
}

const editIngredient = ( id, update) => {
  return Ingredient.findByIdAndUpdate(id, update, { new: true });
}

const deleteIngredient = (id) => {
  return Ingredient.findByIdAndDelete(id);
}

module.exports = {
  createIngredient,
  findIngredient,
  fetchAllIngredients,
  editIngredient,
  deleteIngredient
}