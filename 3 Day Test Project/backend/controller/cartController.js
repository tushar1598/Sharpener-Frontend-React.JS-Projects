const Cart = require("../models/cart");
const Recipe = require("../models/recipe");

module.exports.Add = async function (req, res) {
  const { userId, recipe } = req.body;

  try {
    const existingCartItem = await Cart.findOne({
      userId,
      "items.recipeId": recipe._id,
    });

    if (existingCartItem) {
      return res.status(400).json({ message: "Recipe already in cart" });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: {
            recipeId: recipe._id,
            name: recipe.name,
            price: recipe.price,
            image: recipe.image,
          },
        },
      },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Recipe added to cart", cart: updatedCart.items });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add recipe to cart" });
  }
};

module.exports.Remove = async function (req, res) {
  const { userId, recipeId } = req.body;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { recipeId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Recipe removed from cart", cart: updatedCart.items });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Failed to remove recipe from cart" });
  }
};

module.exports.fetchCart = async function (req, res) {
  const { id } = req.query;
  try {
    const userCart = await Cart.findOne({ userId: id });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found", cart: [] });
    }
    res.status(200).json({ cart: userCart.items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};
