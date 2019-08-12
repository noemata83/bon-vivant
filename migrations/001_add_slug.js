const config =          require('../config/keys'),
      mongoose =        require('mongoose'),
      Spec =            require('../models/Spec'),
      Ingredient =      require('../models/Ingredient').model,
      slugify =         require('slugify');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);  
mongoose.connect(config.mongoURI, { useNewUrlParser: true});

async function MigrateSpecs() {
  const specs = await Spec.find();
  specs.forEach(async (spec) => {
    const slug = slugify(spec.name.toLowerCase());
    spec.slug = slug;
    try {
      console.log(`Creating slug "${slug} for ${spec.name}...`);
      await spec.save(); 
    } catch(error) {
      console.log(error);
    }
  });
}

async function MigrateIngredients() {
  const ingredients = await Ingredient.find();
  ingredients.forEach(async (ingredient) => {
    const slug = slugify(ingredient.name.toLowerCase());
    ingredient.slug = slug;
    try {
      console.log(`Creating slug "${slug} for ${ingredient.name}...`);
      await ingredient.save()
    } catch (err) {
      console.log(err);
    }
  });
}

MigrateSpecs();
MigrateIngredients();