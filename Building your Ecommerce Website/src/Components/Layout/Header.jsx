import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Cart from "../Cart/Cart";
import CartContext from "../Store/CartContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContaxt";

const Header = () => {
  const nevigate = useNavigate();
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(!showCart);
  };

  const logoutHandler = () => {
    authContext.logout();
    alert("User Logged out Successfully!!");
    nevigate("/");
  };

  let totalAmount = 0;
  cartContext.items.map((item) => (totalAmount += item.quantity));

  return (
    <div className="navbar">
      <header className="header">
        <div className="links">
          <Link to="/">Home</Link>
        </div>

        {authContext.isLoggedIn && (
          <div className="links">
            <Link to="/store">Store</Link>
          </div>
        )}

        <div className="links">
          <Link to="/about">About</Link>
        </div>

        {!authContext.isLoggedIn && (
          <div className="links">
            <Link to="/login">Login</Link>
          </div>
        )}

        <div className="links">
          <Link to="/contact-us">Contact Us</Link>
        </div>

        {authContext.isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}

        <Button className="cart-holder" onClick={showCartHandler}>
          Cart ({totalAmount})
        </Button>

        {showCart && <Cart showCartHandler={showCartHandler}></Cart>}
      </header>
      <h1>The Generics</h1>
    </div>
  );
};

export default Header;
