import React, { useContext } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import CartContext from "../Store/CartContext";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  let totalPrice = 0;
  cartContext.items.map(
    (item) =>
      (totalPrice += Number(item.items.quantity) * Number(item.items.price))
  );

  return (
    <section id="cart" className="container">
      <h2>CART</h2>
      <button className="cancel" onClick={props.showCartHandler}>
        X
      </button>
      <div className="cart-header">
        <span className="cart-item">ITEM</span>
        <span className="cart-price">PRICE</span>
        <span className="cart-quantity">QUANTITY</span>
      </div>
      <div>
        <CartItem />
      </div>
      <div>
        <span>
          <span className="total-title">Total</span>
        </span>
        <span className="total-value">${totalPrice}</span>
      </div>
      <button className="purchase-btn" type="button">
        Purchase
      </button>
    </section>
  );
};

export default Cart;
