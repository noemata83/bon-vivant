const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const Spec = require('./Spec').schema;
const Ingredient = require('./Ingredient').schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  book: [Spec],
  shelf: [Ingredient]
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
  const hash = await bcrypt.hash(this.password, 10);
  user.password = hash;
  next();
  }
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

module.exports = mongoose.model('Users', UserSchema);