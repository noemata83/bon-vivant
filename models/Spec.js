const mongoose = require('mongoose');
const { Schema } = mongoose;
const Ingredient = require('./Ingredient').schema;
const slugify = require('slugify');

const SpecIngredient = new Schema({
  quantity: Number,
  measure: Number,
  ingredient: Ingredient,
  canSub: Boolean,
  subWith: String
});

const Review = new Schema({
  rating: Number,
  posted: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  comment: String,
});

const SpecSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: 'Please provide a name for this cocktail'
  },
  slug: {
    type: String,
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
  },
  reviews: [Review],
});

SpecSchema.pre('save', function(next) {
  const spec = this;
  if (spec.slug) {
    next();
  } else {
    const slug = slugify(slug.name.toLowerCase());
    spec.slug = slug;
    next();
  }
})

module.exports = mongoose.model('Specs', SpecSchema);