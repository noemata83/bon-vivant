const config = require('../config/keys'),
  mongoose = require('mongoose'),
  Ingredient = require('../models/Ingredient').model,
  IngredientType = require('../models/IngredientType').model

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoURI, { useNewUrlParser: true })

const ConvertIngredientTypesToFamilies = async ingredient => {
  if (ingredient.family.length > 0) return
  ingredient.family = await Promise.all(
    ingredient.type.map(async type => {
      const foundType = await IngredientType.findOne({ name: type })
      if (foundType) {
        return foundType._id
      } else {
        newType = await IngredientType.create({ name: type })
        return newType._id
      }
    })
  )
  ingredient.save()
}

const MigrateIngredients = async () => {
  const ingredients = await Ingredient.find()
  await ingredients.forEach(ingredient =>
    ConvertIngredientTypesToFamilies(ingredient)
  )
}

MigrateIngredients()
