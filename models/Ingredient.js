const mongoose = require('mongoose');
const { Schema } = mongoose;


const IngredientSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of the ingredient'
  },
  type: String,
  description: String,
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "spec"
  }
});

module.exports = {
  model: mongoose.model('ingredients', IngredientSchema),
  schema: IngredientSchema };