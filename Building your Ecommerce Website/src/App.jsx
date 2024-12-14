import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import CartProvider from "./Components/Store/CartProvider";
import Routers from "./Components/Routers/Router";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <Header />
          <Routers />
          <Footer />
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
