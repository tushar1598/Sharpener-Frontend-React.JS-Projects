import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  fetchExpense: () => {},
  addExpense: (expense) => {},
  updateExpense: (expense) => {},
  removeExpense: (expense) => {},
});

export default ExpenseContext;
