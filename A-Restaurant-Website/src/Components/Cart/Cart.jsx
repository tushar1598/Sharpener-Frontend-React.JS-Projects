import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={styles["car-items"]}>
      {[{ id: "c1", name: "Shushi", amount: 2, price: 12.99 }].map(
        (item, i) => (
          <li key={i}>{item.name}</li>
        )
      )}
    </ul>
  );
  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
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
