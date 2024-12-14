import React from "react";
import ProductList from "../Products/ProductLists";
import About from "../Layout/About";
import { Route, Routes } from "react-router-dom";
import Home from "../Layout/Home";
import ContactUs from "../Layout/ContactUs";

const routePath = {
  Home: "/",
  Store: "/store",
  About: "/about",
  ContactUs: "/contact-us",
};

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path={routePath.Home} element={<Home />} />
        <Route path={routePath.Store} element={<ProductList />} />
        <Route path={routePath.About} element={<About />} />
        <Route path={routePath.ContactUs} element={<ContactUs />} />
      </Routes>
    </div>
  );
};

export default Routers;
