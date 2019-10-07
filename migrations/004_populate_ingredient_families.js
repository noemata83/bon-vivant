const config = require('../config/keys'),
  mongoose = require('mongoose'),
  Ingredient = require('../models/Ingredient').model,
  IngredientType = require('../models/IngredientType').model

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoURI, { useNewUrlParser: true })

async function populateIngredientFamilies() {
  const ingredients = await Ingredient.find()
  ingredients.forEach(ingredient => {
    ingredient.family = ingredient.family.map(async fam => {
      const type = await IngredientType.findById(fam._id)
      return type
    })
    Promise.all(ingredient.family).then(completed => {
      ingredient.family = completed
      ingredient.save()
    })
  })
}

populateIngredientFamilies()
