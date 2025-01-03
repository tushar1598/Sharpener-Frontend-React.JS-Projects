import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/Auth-Slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
    navigate("/users/sign-in");
    toast.success("User signed out successfully!!");
  }, [dispatch, navigate]);

  return null;
};

export default SignOut;
