import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditRecipe.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [flag, setFlag] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    ingredients: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/recipes/fetch-recipe-category"
        );
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/recipes/fetch-all-recipes`
        );
        if (res.data.recipes) setRecipes(res.data.recipes);
        else setFlag(false);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleDetailsClick = (recipe) => {
    setSelectedRecipe(recipe);
    setFormData({
      name: recipe.name,
      price: recipe.price || "",
      category: recipe.category || "",
      ingredients: recipe.ingredients?.join(", ") || "",
      image: null,
    });
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("ingredients", formData.ingredients);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const res = await axios.put(
        `http://localhost:9000/recipes/update-recipe/?id=${selectedRecipe._id}`,
        formDataToSend
      );
      if (res.data.success) {
        toast.success("Recipe updated successfully!");
        setSelectedRecipe(null);
        const updatedRecipes = await axios.get(
          `http://localhost:9000/recipes/fetch-all-recipes`
        );
        setRecipes(updatedRecipes.data.recipes);
      } else {
        alert("Failed to update the recipe.");
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
      toast.error("An error occurred while updating the recipe.");
    }
  };

  return (
    <div className="recipes-container">
      {selectedRecipe ? (
        <div className="recipe-details-view">
          <button onClick={handleBackClick} className="back-btn">
            Back
          </button>
          <h2>Update Recipe</h2>
          <form onSubmit={handleUpdateRecipe}>
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <textarea
              name="ingredients"
              placeholder="Ingredients (comma-separated)"
              value={formData.ingredients}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <button type="submit" className="update-btn">
              Update Recipe
            </button>
          </form>
        </div>
      ) : flag ? (
        recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <img
              src={`http://localhost:9000/${recipe.image}`}
              alt={recipe.name}
              className="recipe-card-img"
            />
            <div className="recipe-card-info">
              <h3>{recipe.name}</h3>
              <p>{recipe.description || recipe.ingredients?.join(", ")}</p>
              <p>
                <strong>Price:</strong> ${recipe.price || "N/A"}
              </p>
              <button
                onClick={() => handleDetailsClick(recipe)}
                className="details-btn"
              >
                Update
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>Oops.... No Recipes Found!!</h1>
      )}
    </div>
  );
};

export default EditRecipe;
