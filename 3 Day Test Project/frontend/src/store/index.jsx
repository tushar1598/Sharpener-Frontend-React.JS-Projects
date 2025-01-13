import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import cartReducer from "./Cart-Slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
