import { useState } from "react";
import Cart from "./Components/Cart/Cart.jsx";
import Header from "./Components/Header/Header.jsx";
import ShoesForm from "./Components/ShoesForm/ShoesForm.jsx";
import ItemList from "./Components/ItemLists/ItemList.jsx";
import CartProvider from "./Store/CartProvider.jsx";

import "./App.css";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart hideCartHandler={hideCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <ShoesForm />
      <ItemList />
    </CartProvider>
  );
}

export default App;
