import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartBackend,
  removeFromCartBackend,
} from "../../store/Cart-Action-Creator";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [recipes, setRecipes] = useState([]);
  const [flag, setFlag] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/recipes/fetch-recipes/?id=${id}`
        );
        if (res.data.recipes) setRecipes(res.data.recipes);
        else setFlag(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchRecipes();
  }, [id]);

  const handleDetailsClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  const isInCart = (recipe) =>
    cart.some((item) => item.recipeId === recipe._id);

  return (
    <div className="recipes-container">
      {selectedRecipe ? (
        <div className="recipe-details-view">
          <button onClick={handleBackClick} className="back-btn">
            Back
          </button>
          <h2>{selectedRecipe.name}</h2>
          <img
            src={`http://localhost:9000/${selectedRecipe.image}`}
            alt={selectedRecipe.name}
            className="recipe-details-img"
          />
          <p>
            {selectedRecipe.description ||
              selectedRecipe.ingredients?.join(", ")}
          </p>
          <p>
            <strong>Price:</strong> ${selectedRecipe.price || "N/A"}
          </p>
          <p>
            <strong>Ingredients:</strong>{" "}
            {selectedRecipe.ingredients?.join(", ")}
          </p>
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
                Details
              </button>
              <div className="cart-buttons">
                {!isInCart(recipe) ? (
                  <button
                    onClick={() =>
                      dispatch(
                        addToCartBackend({
                          userId: user._id,
                          recipe: recipe,
                        })
                      )
                    }
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCartBackend({
                          userId: user._id,
                          recipeId: recipe._id,
                        })
                      )
                    }
                    className="remove-from-cart-btn"
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>Oops.... No Recipes Found!!</h1>
      )}
    </div>
  );
};

export default RecipeDetails;
