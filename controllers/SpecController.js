const Spec = require('../models/Spec')
const User = require('../models/User')
const { findIngredient } = require('./IngredientController')
const { purgeDuplicates } = require('../shared/utility')
const R = require('ramda')

const createSpec = async spec => {
  if (spec.riffOn) {
    const riffSpec = await findSpec({ name: spec.riffOn })
    spec.riffOn = riffSpec._id
  }
  spec.ingredients = spec.ingredients.map(async ing => {
    const ingredient = await findIngredient({ name: ing.name })
    delete ing.name
    return { ...ing, ingredient: ingredient._id }
  })
  await Promise.all(spec.ingredients).then(completed => {
    spec.ingredients = completed
  })
  return Spec.create(spec)
}

const fetchAllSpecs = () => Spec.find()

const findSpec = ({ id, slug, name }) => {
  if (id) {
    return Spec.findById(id)
  } else if (slug) {
    return Spec.findOne({ slug })
  } else {
    return Spec.findOne({ name })
  }
}

const editSpec = async (id, updates) => {
  if (updates.riffOn) {
    const riffSpec = await findSpec({ name: updates.riffOn })
    updates.riffOn = riffSpec._id
  }
  if (updates.ingredients) {
    updates.ingredients = updates.ingredients.map(async ing => {
      const ingredient = await findIngredient({ name: ing.name })
      delete ing.name
      return { ...ing, ingredient: ingredient._id }
    })
    await Promise.all(updates.ingredients).then(completed => {
      updates.ingredients = completed
    })
  }
  return Spec.findByIdAndUpdate(id, updates, { new: true })
}

const deleteSpec = async id => {
  const childSpecCollection = await Spec.find({ riffOn: id }).exec()
  childSpecCollection.forEach(childSpec => {
    childSpec.riffOn = undefined
    childSpec.save()
  })
  return Spec.findByIdAndDelete(id)
}

const getAvailableSpecs = async userId => {
  const user = await User.findById(userId)
  const specificIngredients = user.shelf.map(ingredient => ingredient.name)
  const types = R.flatten(user.shelf.map(ingredient => ingredient.type))
  const availableTypes = purgeDuplicates(types)
  const allSpecs = await Spec.find()
  const specs = allSpecs.filter(spec => {
    const canMake = spec.ingredients.every(ing => {
      if (specificIngredients.includes(ing.ingredient.name)) {
        return true
      }
      if (!ing.canSub && !specificIngredients.includes(ing.ingredient.name)) {
        return false
      } else if (ing.canSub && !availableTypes.includes(ing.subWith)) {
        return false
      }
      return true
    })
    return canMake
  })
  return specs
}

module.exports = {
  createSpec,
  findSpec,
  fetchAllSpecs,
  editSpec,
  deleteSpec,
  getAvailableSpecs
}
