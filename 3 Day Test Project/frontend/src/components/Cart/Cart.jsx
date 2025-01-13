import React, { useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartBackend,
  placeOrderBackend,
} from "../../store/Cart-Action-Creator";

const Cart = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart, cartCount, orderStatus, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveFromCart = (recipeId) => {
    dispatch(
      removeFromCartBackend({
        userId: user._id,
        recipeId: recipeId,
      })
    );
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      alert("Your cart is empty!");
      return;
    }
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      alert("Please enter a delivery address!");
      return;
    }

    dispatch(
      placeOrderBackend({
        userId: user._id,
        cart,
        deliveryAddress,
        paymentMethod,
      })
    );
  };

  const handlePaymentMethodChange = (method) => {
    dispatch(cartActions.setPaymentMethod(method));
  };

  const handleBackToCart = () => {
    setIsCheckingOut(false);
  };

  if (orderStatus === "success") {
    return (
      <div className="order-success">
        <h1>Order Placed Successfully!</h1>
        <p>Your order will be delivered to:</p>
        <p>{deliveryAddress}</p>
        <p>
          <strong>Payment Method:</strong> Cash on Delivery
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {!isCheckingOut && (
        <>
          <div className="cart-items">
            {cartCount > 0 ? (
              cart.map((item) => (
                <div className="cart-item-card" key={item._id}>
                  <img
                    src={`http://localhost:9000/${item.image}`}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description || item.ingredients?.join(", ")}</p>
                    <p>
                      <strong>Price:</strong> ${item.price || "N/A"}
                    </p>
                    <button
                      onClick={() => handleRemoveFromCart(item.recipeId)}
                      className="remove-from-cart-btn"
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>Your cart is empty!</h2>
            )}
          </div>
          {cartCount > 0 && (
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout Your Cart
            </button>
          )}
        </>
      )}
      {isCheckingOut && cartCount > 0 && (
        <div className="checkout-section">
          <h2>Delivery Address</h2>
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your delivery address"
            rows="4"
            required
          ></textarea>

          <h2>Payment Method</h2>
          <div className="payment-method">
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          <div className="checkout-actions">
            <button onClick={handleBackToCart} className="back-btn">
              Back to Cart
            </button>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              {orderStatus === "loading" ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
