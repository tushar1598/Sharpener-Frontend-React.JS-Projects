import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./components/Routes/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./store/Cart-Action-Creator";
import Toast from "./toast";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCart({ userId: user._id }));
    }
  }, [dispatch, user]);

  const router = Router();
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}

export default App;
