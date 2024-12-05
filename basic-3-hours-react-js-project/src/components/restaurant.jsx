import React, { useState } from "react";

const Restaurant = () => {
  const Data = JSON.parse(localStorage.getItem("Restaurant Orders")) || [];
  const [order, setOrder] = useState({
    id: "",
    price: "",
    dish: "",
    table: "",
  });
  const [orders, setOrders] = useState(Data);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const updatedOrders = [...orders, order];
    localStorage.setItem("Restaurant Orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    alert("Order Created Successfully");
    setOrder({
      id: "",
      price: "",
      dish: "",
      table: "",
    });
  };
  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const DeleteHandler = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("Restaurant Orders", JSON.stringify(updatedOrders));
    alert(`Order with ID: ${id} has been deleted successfully`);
  };

  return (
    <>
      <form onSubmit={SubmitHandler}>
        <label htmlFor="">Unique Order ID</label>
        <input
          type="number"
          name="id"
          value={order.id}
          placeholder="Order Id"
          onChange={ChangeHandler}
          required
        />
        <label htmlFor="">Choose Price</label>
        <input
          type="number"
          name="price"
          value={order.price}
          placeholder="Price"
          onChange={ChangeHandler}
          required
        />
        <label htmlFor="">Choose Dish</label>
        <input
          type="text"
          name="dish"
          value={order.dish}
          placeholder="Dish"
          onChange={ChangeHandler}
          required
        />
        <label htmlFor="">Choose a Table</label>
        <select
          name="table"
          value={order.table}
          onChange={ChangeHandler}
          required
        >
          <option value="">Choose a table</option>
          <option value="Table 1">Table 1</option>
          <option value="Table 2">Table 2</option>
          <option value="Table 3">Table 3</option>
        </select>
        <input id="btn" type="submit" value="Add to bill" />
      </form>
      <br />
      <h1>Orders</h1>

      <h2>Table 1</h2>
      <ul>
        {orders
          .filter((order) => order.table === "Table 1")
          .map((order, i) => (
            <li key={i}>
              <strong>ID:</strong> {order.id}, <strong>Price:</strong>
              {order.price}, <strong>Dish:</strong> {order.dish}
              <button
                className="delete"
                onClick={() => DeleteHandler(order.id)}
              >
                Delete Order
              </button>
            </li>
          ))}
      </ul>

      <h2>Table 2</h2>
      <ul>
        {orders
          .filter((order) => order.table === "Table 2")
          .map((order, i) => (
            <li key={i}>
              <strong>ID:</strong> {order.id}, <strong>Price:</strong>
              {order.price}, <strong>Dish:</strong> {order.dish}
              <button
                className="delete"
                onClick={() => DeleteHandler(order.id)}
              >
                Delete Order
              </button>
            </li>
          ))}
      </ul>

      <h2>Table 3</h2>
      <ul>
        {orders
          .filter((order) => order.table === "Table 3")
          .map((order, i) => (
            <li key={i}>
              <strong>ID:</strong> {order.id}, <strong>Price:</strong>
              {order.price}, <strong>Dish:</strong> {order.dish}
              <button
                className="delete"
                onClick={() => DeleteHandler(order.id)}
              >
                Delete Order
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Restaurant;
