import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/CartContext";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const increaseItem = (itemId) => {
    cartContext.items.forEach((item) => {
      if (item.id === itemId) {
        cartContext.addItem({ ...item, quantity: 1 });
      }
    });
  };
  const decreaseItem = (itemId) => {
    cartContext.items.forEach((item) => {
      if (item.id === itemId) {
        cartContext.removeItem(itemId);
      }
    });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>x{item.quantity}</span>
          <span>${item.price}</span>
          <div className="btnGroup">
            <button
              className={styles["button--decrease"]}
              onClick={() => decreaseItem(item.id)}
            >
              -
            </button>
            <button
              className={styles["button--increase"]}
              onClick={() => increaseItem(item.id)}
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  let totalPrice = 0;
  cartContext.items.forEach((item) => {
    totalPrice += Number(item.price) * Number(item.quantity);
    totalPrice = parseFloat(totalPrice.toFixed(2));
  });

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalPrice}</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles["buttton--alt"]}
          onClick={props.hideCartHandler}
        >
          close
        </button>
        <button className={styles.buttom}>Order</button>
      </div>
    </Modal>
  );
};
export default Cart;
