const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const recipeController = require("../controller/recipeController");

router.post("/create-recipe", upload, recipeController.CreateRecipe);
router.get("/fetch-recipe-category", recipeController.fetchRecipeCategory);
router.get("/fetch-recipes", recipeController.fetchRecipesfromCategory);
router.get("/fetch-all-recipes", recipeController.fetchAllRecipes);
router.put("/update-recipe", upload, recipeController.UpdateRecipe);
router.delete("/delete-recipe", recipeController.DeleteRecipe);

module.exports = router;
