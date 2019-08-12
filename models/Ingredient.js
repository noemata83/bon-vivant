const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify  = require('slugify');


const IngredientSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of the ingredient',
  },
  slug: {
    type: String,
    unique: true,
  },
  type: [String],
  description: String,
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "spec"
  }
});

IngredientSchema.pre('save', function(next) {
  const ingredient = this;
  if (ingredient.slug) {
    next();
  } else {
    const slug = slugify(ingredient.name.toLowerCase());
    ingredient.slug = slug;
    next();
  }
});

module.exports = {
  model: mongoose.model('ingredients', IngredientSchema),
  schema: IngredientSchema };