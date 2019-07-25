const Ingredient = require('../models/Ingredient').model;

const createIngredient = async (ingredient) => {
  const newIngredient = await Ingredient.create(ingredient);
  return newIngredient;
}

const fetchAllIngredients = () => {
  return Ingredient.find();
}

const findIngredient = ({ id, name }) => {
  if (id) {
    return Ingredient.findById(id);
  } else {
    return Ingredient.findOne({ name })
  }
}

module.exports = {
  createIngredient,
  findIngredient,
  fetchAllIngredients
}