import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./components/Routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = Router();
  0;
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        style={{ top: "70px", height: "50px" }}
        autoClose={2500}
      />
    </>
  );
}

export default App;
