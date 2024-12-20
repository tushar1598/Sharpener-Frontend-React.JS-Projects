import React, { useContext } from "react";
import Modal from "../../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../Store/CartContaxt";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const deleteItem = (item) => {
    cartCtx.cartItems.forEach((itemss) => {
      if (itemss.items.shoesName === item.items.shoesName) {
        cartCtx.removeCartItem(item);
      }
    });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.cartItems.map((item) => (
        <li key={item.items.shoesName}>
          <span>{item.items.shoesName}</span>
          {Number(item.items.large) > 0 && <span>L{item.items.large}</span>}
          {Number(item.items.medium) > 0 && <span>M{item.items.medium}</span>}
          {Number(item.items.small) > 0 && <span>S{item.items.small}</span>}
          <span>${item.items.price}</span>
          <div className="btnGroup">
            <button
              className={styles["button--decrease"]}
              onClick={() => deleteItem(item)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  let totalPrice = 0;
  let sum = 0;
  cartCtx.cartItems.forEach((item) => {
    sum =
      Number(item.items.large) +
      Number(item.items.medium) +
      Number(item.items.small);
    totalPrice += Number(item.items.price) * Number(sum);
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
