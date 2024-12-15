import React from "react";
import { useContext } from "react";
import "./CartItem.css";
import CartContext from "../Store/CartContext";

const CartItem = () => {
  const cartContext = useContext(CartContext);

  const removeItemFromCart = (id) => {
    cartContext.removeItem(id);
  };

  console.log(cartContext.items);

  return (
    <div>
      {cartContext.items.map((item, i) => (
        <div className="cart-items" key={i}>
          <div className="cart-item-name">
            <img src={item.items.imageUrl} alt=""></img>
            <span className="title">{item.items.title}</span>
          </div>
          <div className="cart-items-price">{item.items.price}</div>
          <div className="cart-items-quantity">
            <input type="number" value={item.items.quantity} readOnly />
            <button onClick={() => removeItemFromCart(item._id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
