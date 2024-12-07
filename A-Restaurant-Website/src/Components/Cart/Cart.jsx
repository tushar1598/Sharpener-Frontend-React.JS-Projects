import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/CartContext";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <li key={item.id}>
          <span>Name:</span> {item.name}
          <span>Quantity:</span> {item.quantity}
          <span>Price:</span> ${item.price}
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
