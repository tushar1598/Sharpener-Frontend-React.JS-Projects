import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/CartContaxt";

import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const totalQuantity = cartCtx.cartItems.reduce((acc, item) => {
    const { large = 0, medium = 0, small = 0 } = item.items || {};
    return acc + large + medium + small;
  }, 0);

  return (
    <button className="cart-button" onClick={props.showCartHandler}>
      <span className="cart-icon">
        <CartIcon />
      </span>
      <h3>
        Cart<span id="count">{totalQuantity}</span>
      </h3>
    </button>
  );
};

export default HeaderCartButton;
