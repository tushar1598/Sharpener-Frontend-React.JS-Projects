import React, { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Home from "../../Pages/Home";
import SignUp from "../Auth/Sign-up";
import SignIn from "../Auth/Sign-in";
import NotFound from "../../Pages/invalid";
import PasswordResetLink from "../../Pages/password-reset-link";
import Profile from "../Profile/profile";
import SignOut from "../../Pages/Sign-out";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHandler } from "../../store/Auth-Action-Creator";
import Resetpassword from "../../Pages/reset-password";
import Dashboard from "../Dashboard/Dashboard";
import Categories from "../others/Categories";
import Orders from "../others/Orders";
import RecipeDetails from "../others/recipeDetails";
import Cart from "../Cart/Cart";

const Router = () => {
  const dispatch = useDispatch();
  const { user, authLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserHandler());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/users/sign-in",
          element: user ? <Navigate to="/users/dashboard" /> : <SignIn />,
        },
        {
          path: "/users/sign-up",
          element: user ? <Navigate to="/users/dashboard" /> : <SignUp />,
        },
        {
          path: "/users/profile",
          element: user ? <Profile /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/categories",
          element: user ? <Categories /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/orders",
          element: user ? <Orders /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/dashboard",
          element: user ? <Dashboard /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/cart",
          element: user ? <Cart /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/recipes/:id",
          element: user ? <RecipeDetails /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "/users/reset-password-link-page",
          element: user ? (
            <Navigate to="/users/dashboard" />
          ) : (
            <PasswordResetLink />
          ),
        },
        {
          path: "/users/reset-password/:id",
          element: user ? (
            <Navigate to="/users/dashboard" />
          ) : (
            <Resetpassword />
          ),
        },
        {
          path: "/users/Sign-out",
          element: user ? <SignOut /> : <Navigate to="/users/sign-in" />,
        },
        {
          path: "*", // Wildcard for any unmatched routes
          element: <NotFound />,
        },
      ],
    },
  ]);

  return router;
};

export default Router;
