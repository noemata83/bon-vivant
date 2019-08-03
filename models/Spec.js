const mongoose = require('mongoose');
const { Schema } = mongoose;
const Ingredient = require('./Ingredient').schema;

const SpecIngredient = new Schema({
  quantity: Number,
  measure: Number,
  ingredient: Ingredient,
  canSub: Boolean,
  subWith: [String]
})

const SpecSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: 'Please provide a name for this cocktail'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  description: String,
  ingredients: [SpecIngredient],
  directions: {
    type: String,
    required: 'Please provide instructions for mixing this cocktail',
  },
  riffOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specs"
  }
});

module.exports = mongoose.model('Specs', SpecSchema);