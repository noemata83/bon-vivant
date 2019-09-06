const mongoose = require('mongoose')
const { Schema } = mongoose
const slugify = require('slugify')

const IngredientTypeSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of this ingredient type.'
  },
  slug: String,
  description: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'ingredientTypes'
  }
})

IngredientTypeSchema.pre('save', function(next) {
  const ingredientType = this
  if (ingredientType.slug) {
    next()
  } else {
    const slug = slugify(ingredientType.name.toLowerCase())
    ingredientType.slug = slug
    next()
  }
})

module.exports = mongoose.model('ingredientTypes', IngredientTypeSchema)
