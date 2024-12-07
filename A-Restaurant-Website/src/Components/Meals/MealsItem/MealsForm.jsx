import React, { useContext } from "react";
import styles from "./MealsForm.module.css";
import Input from "../../UI/input";
import CartContext from "../../../store/CartContext";

const MealsForm = (props) => {
  const cartContext = useContext(CartContext);
  const addItemToCart = (event) => {
    event.preventDefault();
    // update the cartCtx.items
    const quantity = document.getElementById("amount_" + props.id).value;
    cartContext.addItem({ ...props.item, quantity: quantity });
  };

  return (
    <form className={styles.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={addItemToCart}>+ Add</button>
    </form>
  );
};

export default MealsForm;
