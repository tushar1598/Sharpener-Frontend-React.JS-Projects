import React, { useContext } from "react";
import styles from "./header.module.css";
import CartContext from "../../store/CartContext";

const Headers = (props) => {
  const cartContext = useContext(CartContext);

  let quantity = 0;
  cartContext.items.forEach((item) => {
    quantity = quantity + Number(item.quantity);
  });

  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button onClick={props.showCartHandler} className={styles.cartButton}>
          <span className={styles.cartIcon}>🛒</span>
          <span>Your Cart</span>
          <span className={styles.cartBadge}>{quantity}</span>
        </button>
      </header>
      <div className={styles["main-image"]}>
        <img
          src="https://images2.alphacoders.com/100/1003810.jpg"
          alt="A table full of delicious food!"
        />
      </div>
    </>
  );
};

export default Headers;
