const Recipe = require("../models/recipe");
const Category = require("../models/category");

module.exports.CreateRecipe = async function (req, res) {
  const { name, category, ingredients, price } = req.body;
  const image = req.file ? req.file.path : null;
  const recipe = await Recipe.create({
    name,
    category,
    ingredients,
    price,
    image,
  });
  return res.status(200).json({
    message: "Recipe created successfully",
    recipe,
  });
};

module.exports.fetchRecipeCategory = async function (req, res) {
  const categories = await Category.find({});
  return res.status(200).json({
    categories,
  });
};

module.exports.fetchRecipesfromCategory = async function (req, res) {
  const { id } = req.query;
  const category = await Category.findById(id);
  const recipes = await Recipe.find({ category: category.name });
  if (recipes.length) {
    return res.status(200).json({
      recipes,
    });
  }
  return res.status(200).json({
    recipes: false,
  });
};

module.exports.fetchAllRecipes = async function (req, res) {
  const recipes = await Recipe.find({});
  return res.status(200).json({
    recipes,
  });
};

module.exports.UpdateRecipe = async function (req, res) {
  const { id } = req.query;
  const { name, category, description, price, ingredients } = req.body;
  const image = req.file?.path;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
        ...(image && { image }),
      },
      { new: true }
    );
    res.json({ success: true, recipe: updatedRecipe });
  } catch (err) {
    console.error("Error updating recipe:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update recipe" });
  }
};

module.exports.DeleteRecipe = async function (req, res) {
  try {
    const { id } = req.query;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (deletedRecipe) {
      res.json({ success: true, message: "Recipe deleted successfully" });
    } else {
      res.json({ success: false, message: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
