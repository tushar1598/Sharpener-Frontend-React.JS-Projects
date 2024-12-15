import React, { useC, useContext } from "react";
import ProductList from "../Products/ProductLists";
import About from "../Layout/About";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Layout/Home";
import ContactUs from "../Layout/ContactUs";
import ProductPage from "../Products/ProductPage";
import AuthForm from "../Auth/AuthForm";
import AuthContext from "../Store/AuthContaxt";

export const routePath = {
  Home: "/",
  Store: "/store",
  About: "/about",
  ContactUs: "/contact-us",
  ProductPage: "/store/product",
  Login: "/login",
};

const Routers = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path={routePath.Home} element={<Home />} />

        <Route
          path={routePath.Store}
          element={
            authContext.isLoggedIn ? (
              <ProductList />
            ) : (
              <Navigate to={routePath.Login} />
            )
          }
        />

        <Route
          path={routePath.ProductPage}
          element={
            authContext.isLoggedIn ? (
              <ProductPage />
            ) : (
              <Navigate to={routePath.Login} />
            )
          }
        />

        <Route path={routePath.About} element={<About />} />

        <Route
          path={routePath.Login}
          element={
            authContext.isLoggedIn ? (
              <Navigate to={routePath.Store} />
            ) : (
              <AuthForm />
            )
          }
        />

        <Route path={routePath.ContactUs} element={<ContactUs />} />
      </Routes>
    </div>
  );
};

export default Routers;
