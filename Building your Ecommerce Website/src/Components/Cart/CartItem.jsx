import React from "react";
import { useContext } from "react";
import "./CartItem.css";
import CartContext from "../Store/CartContext";

const CartItem = () => {
  const cartContext = useContext(CartContext);
  const removeItemFromCart = (id) => {
    cartContext.removeItem(id);
  };

  return (
    <div>
      {cartContext.items.map((item, i) => (
        <div className="cart-items" key={i}>
          <div className="cart-item-name">
            <img src={item.imageUrl} alt=""></img>
            <span className="title">{item.title}</span>
          </div>
          <div className="cart-items-price">{item.price}</div>
          <div className="cart-items-quantity">
            <input type="number" value={item.quantity} readOnly />
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
