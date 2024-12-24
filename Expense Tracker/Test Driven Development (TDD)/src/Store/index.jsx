import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import expenseReducer from "./Expense-Slice";
import themeReducer from "./Theme-Slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenseStore: expenseReducer,
    theme: themeReducer,
  },
});

export default store;
