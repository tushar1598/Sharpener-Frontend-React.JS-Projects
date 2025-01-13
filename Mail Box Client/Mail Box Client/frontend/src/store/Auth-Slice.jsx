import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthLoading(state, action) {
      state.authLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("Token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
