const Spec = require('../models/Spec')
const { findIngredient } = require('./IngredientController');

const createSpec = async (spec) => {
  if (spec.riffOn) {
    const riffSpec = await findSpec({ name: spec.riffOn });
    spec.riffOn = riffSpec._id;
  }
  spec.ingredients = spec.ingredients.map(async (ing) => {
    const ingredient = await findIngredient({ name: ing.name });
    delete ing.name;
    return { ...ing, ingredient };
  } );
  await Promise.all(spec.ingredients).then((completed) => { spec.ingredients = completed;});
  return Spec.create(spec)
}

const fetchAllSpecs = () => Spec.find();

const findSpec = ({ id, name }) => {
  if (id) {
    return Spec.findById(id);
  } else {
    return Spec.findOne({ name })
  }
}

const deleteSpec = async (id) => {
  const childSpecCollection = await Spec.find({ riffOn: id }).exec();
  childSpecCollection.forEach(childSpec => {
    childSpec.riffOn = undefined;
    childSpec.save();
  } );
  return Spec.findByIdAndDelete(id);
}

module.exports = {
  createSpec,
  findSpec,
  fetchAllSpecs,
  deleteSpec,
}