import "./App.css";
import Header from "./Components/Header";
import ProductList from "./Components/Products/ProductLists";
import CartProvider from "./Components/Store/CartProvider";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <ProductList />
      </CartProvider>
    </>
  );
}

export default App;
