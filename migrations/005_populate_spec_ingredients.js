const config = require('../config/keys'),
  mongoose = require('mongoose'),
  Ingredient = require('../models/Ingredient').model,
  Spec = require('../models/Spec')
// IngredientType = require('../models/IngredientType').model

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongoURI, { useNewUrlParser: true })

async function populateSpecIngredients() {
  const specs = Spec.find().then(specs => {
    specs.forEach(spec => {
      spec.ingredients.forEach(ingredient => {
        if (!ingredient.ingredient.name) {
          Ingredient.findOne(ingredient.ingredient).then(foundIngredient => {
            ingredient.ingredient = foundIngredient
            spec.save()
          })
        }
      })
    })
  })
}

populateSpecIngredients()
console.log('Done!')
