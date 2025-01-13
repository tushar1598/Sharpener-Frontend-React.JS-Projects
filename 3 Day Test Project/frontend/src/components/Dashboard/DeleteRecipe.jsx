import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditRecipe.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/recipes/fetch-all-recipes`
        );
        if (res.data.recipes) setRecipes(res.data.recipes);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:9000/recipes/delete-recipe/?id=${recipeId}`
      );
      if (res.data.success) {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
        toast.success("Recipe deleted successfully!");
      } else {
        toast.error("Failed to delete the recipe.");
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("An error occurred while deleting the recipe.");
    }
  };

  return (
    <div className="recipes-container">
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <img
              src={`http://localhost:9000/${recipe.image}`}
              alt={recipe.name}
              className="recipe-card-img"
            />
            <div className="recipe-card-info">
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients?.join(", ")}</p>
              <p>
                <strong>Price:</strong> ${recipe.price || "N/A"}
              </p>
              <button
                className="details-btn"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>No Recipes Found!</h1>
      )}
    </div>
  );
};

export default DeleteRecipe;
