import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import CartProvider from "./Components/Store/CartProvider";
import Routers from "./Components/Routers/Router";
import { AuthContextProvider } from "./Components/Store/AuthContaxt";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <AuthContextProvider>
            <Header />
            <Routers />
            <Footer />
          </AuthContextProvider>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
