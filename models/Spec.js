const mongoose = require('mongoose');
const { Schema } = mongoose;
const Ingredient = require('./Ingredient');

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
  ingredients: [Ingredient],
  riffOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specs"
  }
});

module.exports = mongoose.model('Specs', SpecSchema);