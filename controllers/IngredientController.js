const Ingredient = require('../models/Ingredient');

const createIngredient = async (ingredient) => {
  const newIngredient = await Ingredient.create(ingredient);
  return newIngredient;
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
  findIngredient
}