import React from "react";
import styles from "./header.module.css";

const Headers = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <button onClick={props.showCartHandler} className={styles.cartButton}>
          <span className={styles.cartIcon}>🛒</span>
          <span>Your Cart</span>
          <span className={styles.cartBadge}>0</span>
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
