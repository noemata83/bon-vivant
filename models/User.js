const mongoose = require('mongoose');
const { Schema } = mongoose;
const Spec = require('./Spec');
const Ingredient = require('./Ingredient');

const UserSchema = new Schema({
  username: String,
  book: [Spec],
  shelf: [Ingredient]
});

module.exports = mongoose.model('Users', UserSchema);