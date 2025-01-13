import React, { useState, useRef, useEffect } from "react";
import "./CreateRecipe.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRecipe = () => {
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    ingredients: "",
    price: "",
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

  const ChangeHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("category", recipe.category);
    formData.append("ingredients", recipe.ingredients);
    formData.append("price", recipe.price);
    formData.append("image", recipe.image);
    const res = await axios.post(
      "http://localhost:9000/recipes/create-recipe",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.recipe) {
      toast.success("Recipe Created Successfully!");
      setRecipe({
        name: "",
        category: "",
        ingredients: "",
        price: "",
        image: null,
      });
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="recipe-form-container">
      <form
        className="recipe-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="form-title">Add a New Recipe</h2>
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={ChangeHandler}
            placeholder="Enter the recipe name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={recipe.category}
            onChange={ChangeHandler}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={ChangeHandler}
            placeholder="List all the ingredients required"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={recipe.price}
            onChange={ChangeHandler}
            placeholder="Enter the price of the recipe"
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Recipe Images</label>
          <input
            type="file"
            className="form-control"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
