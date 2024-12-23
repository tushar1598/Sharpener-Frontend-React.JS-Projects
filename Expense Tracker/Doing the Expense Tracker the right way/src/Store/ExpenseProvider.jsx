import React, { useState } from "react";
import ExpenseContext from "./ExpenseContaxt";
import { useDispatch } from "react-redux";
import { expenseActions } from "./Expense-Slice";

const ExpenseProvider = (props) => {
  const [expenseItems, setExpenseItems] = useState([]);

  const dispatch = useDispatch();

  let userEmail = localStorage.getItem("email");
  if (userEmail) {
    userEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "");
  }

  const api = "https://expense-tracker-e839b-default-rtdb.firebaseio.com/";

  const fetchExpenseHandler = async () => {
    if (userEmail) {
      const url = `${api}/expenses${userEmail}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch expense data");
        }
        const data = await response.json();
        const expenseList = Object.keys(data).map((expenseId) => {
          const expense = data[expenseId];
          return {
            id: expenseId,
            category: expense.category,
            description: expense.description,
            moneySpent: expense.moneySpent,
          };
        });
        dispatch(expenseActions.setItems(expenseList));
        setExpenseItems(expenseList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addExpenseHandler = (item) => {
    userEmail = localStorage.getItem("email");
    if (userEmail) {
      userEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "");
    }
    if (userEmail) {
      const url = `${api}/expenses${userEmail}.json`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("Error adding/updating item");
          }
        })
        .then((data) => {
          item = { ...item, id: data.name };
          setExpenseItems([...expenseItems, item]);
          dispatch(expenseActions.addItem(item));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateExpenseHandler = (updatedExpense) => {
    if (userEmail) {
      const url = `${api}/expenses${userEmail}/${updatedExpense.id}.json`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Expense Updated");
            //update expense from expenseItems
            setExpenseItems((prevExpenseItems) =>
              prevExpenseItems.map((expense) =>
                expense.id === updatedExpense.id ? updatedExpense : expense
              )
            );
            dispatch(expenseActions.editItem({ item: updatedExpense }));
          } else {
            console.error("error while updating item");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const removeExpenseHandler = (expenseId) => {
    if (userEmail) {
      const url = `${api}/expenses${userEmail}/${expenseId}.json`;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Expense successfuly deleted");
            //remove expense from expenseItems
            setExpenseItems((prevExpenseItems) =>
              prevExpenseItems.filter((expense) => expense.id !== expenseId)
            );
            dispatch(expenseActions.removeItem({ id: expenseId }));
          } else {
            console.error("error while deleting item");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const expenseContext = {
    expenses: expenseItems,
    fetchExpense: fetchExpenseHandler,
    addExpense: addExpenseHandler,
    updateExpense: updateExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
