import React from "react";
import styles from "./MealsForm.module.css";
import Input from "../../UI/input";

const MealsForm = (props) => {
  const addItemToCart = (event) => {
    event.preventDefault();
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
