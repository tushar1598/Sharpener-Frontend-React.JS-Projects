import "./App.css";
import Headers from "./Components/Layout/header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <>
      <Cart />
      <Headers />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
