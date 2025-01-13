const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: [String], required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
