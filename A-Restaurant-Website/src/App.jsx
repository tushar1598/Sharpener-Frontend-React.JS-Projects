import React, { useState } from "react";
import "./App.css";
import Headers from "./Components/Layout/header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {cartIsShown && <Cart hideCartHandler={hideCartHandler} />}
      <Headers showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
