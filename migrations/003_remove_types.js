const config = require('../config/keys'),
  mongoose = require('mongoose'),
  Ingredient = require('../models/Ingredient').model,
  IngredientType = require('../models/IngredientType')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoURI, { useNewUrlParser: true })

const RemoveIngredientTypes = ingredient => {
  ingredient.type = null
  ingredient.save()
}

const MigrateIngredients = async () => {
  await Ingredient.update({}, { $unset: { type: '' } })
}

MigrateIngredients()
