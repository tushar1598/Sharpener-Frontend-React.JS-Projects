import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartCount: 0,
    status: "idle",
    orderStatus: "idle",
    paymentMethod: "COD",
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
      state.cartCount = action.payload.length;
    },
    setCartError(state, action) {
      state.status = "error";
    },
    setCartStatus(state, action) {
      state.status = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload;
    },
    clearCart(state) {
      state.cart = [];
      state.cartCount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
