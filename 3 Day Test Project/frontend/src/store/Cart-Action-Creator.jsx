import axios from "axios";
import { cartActions } from "./Cart-Slice";

export const addToCartBackend =
  ({ userId, recipe }) =>
  async (dispatch) => {
    try {
      dispatch(cartActions.setCartStatus("loading"));
      const response = await axios.post("http://localhost:9000/cart/add", {
        userId,
        recipe,
      });
      dispatch(cartActions.setCart(response.data.cart));
      dispatch(cartActions.setCartStatus("idle"));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      dispatch(cartActions.setCartError());
    }
  };

export const removeFromCartBackend =
  ({ userId, recipeId }) =>
  async (dispatch) => {
    try {
      dispatch(cartActions.setCartStatus("loading"));
      const response = await axios.post("http://localhost:9000/cart/remove", {
        userId,
        recipeId,
      });
      dispatch(cartActions.setCart(response.data.cart));
      dispatch(cartActions.setCartStatus("idle"));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      dispatch(cartActions.setCartError());
    }
  };

export const fetchCart =
  ({ userId }) =>
  async (dispatch) => {
    try {
      dispatch(cartActions.setCartStatus("loading"));
      const response = await axios.get(
        `http://localhost:9000/cart/fetch-cart/?id=${userId}`
      );
      dispatch(cartActions.setCart(response.data.cart));
      dispatch(cartActions.setCartStatus("idle"));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      dispatch(cartActions.setCartError());
    }
  };

export const placeOrderBackend =
  ({ userId, cart, deliveryAddress }) =>
  async (dispatch) => {
    try {
      dispatch(cartActions.setOrderStatus("loading"));

      const response = await axios.post(
        "http://localhost:9000/orders/create-order",
        {
          userId,
          items: cart.map((item) => ({
            recipeId: item.recipeId,
            quantity: 1,
            price: item.price,
            name: item.name,
            image: item.image,
          })),
          deliveryAddress,
          paymentMethod: "COD",
        }
      );

      dispatch(cartActions.clearCart());
      dispatch(cartActions.setOrderStatus("success"));

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Failed to place order:", error);
      dispatch(cartActions.setOrderStatus("error"));
    }
  };
