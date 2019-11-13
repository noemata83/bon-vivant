const config = require("../config/keys"),
  mongoose = require("mongoose"),
  Ingredient = require("../models/Ingredient").model;

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

const MigrateIngredients = async () => {
  await Ingredient.update({}, { $unset: { type: "" } });
};

MigrateIngredients();
