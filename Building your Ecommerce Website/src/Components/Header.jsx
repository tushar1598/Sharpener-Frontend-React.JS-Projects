import React, { useState, useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Cart from "./Cart/Cart";
import CartContext from "./Store/CartContext";

const Header = () => {
  const cartContext = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(!showCart);
  };

  let totalAmount = 0;
  cartContext.items.map((item) => (totalAmount += item.quantity));

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">E-Commerce Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="store">Store</Nav.Link>
              <Nav.Link href="about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Button onClick={showCartHandler}>Cart ({totalAmount})</Button>
      </Navbar>
      {showCart && <Cart showCartHandler={showCartHandler}></Cart>}
    </header>
  );
};

export default Header;
