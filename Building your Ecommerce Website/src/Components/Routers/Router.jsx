import ProductList from "../Products/ProductLists";
import About from "../Layout/About";
import { Route, Routes } from "react-router-dom";
import Home from "../Layout/Home";

const routePath = {
  Home: "/",
  Store: "/store",
  About: "/about",
};
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path={routePath.Home} element={<Home />} />
        <Route path={routePath.Store} element={<ProductList />} />
        <Route path={routePath.About} element={<About />} />
      </Routes>
    </div>
  );
};
export default Routers;
