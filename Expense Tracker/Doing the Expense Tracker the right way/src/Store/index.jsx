import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import expenseReducer from "./Expense-Slice";

const store = configureStore({
  reducer: { auth: authReducer, expenseStore: expenseReducer },
});

export default store;
