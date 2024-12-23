import { useDispatch } from "react-redux";
import { uiActions } from "../../Store/UI-Slice";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={styles.badge}>1</span>
    </button>
  );
};

export default CartButton;
