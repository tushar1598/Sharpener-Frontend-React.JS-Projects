import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useSelector } from "react-redux";
import axios from "axios";

const Orders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/orders/fetch-orders/?id=${user._id}`
        );
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <h2>No orders found!</h2>;
  }

  return (
    <div className="order-container">
      <h1>Your Orders</h1>
      <div className="order-cards">
        {orders.map((order) => {
          const subtotal = order.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          return (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>
                <strong>Order Status:</strong> {order.status}
              </p>
              <p>
                <strong>Delivery Address:</strong> {order.deliveryAddress}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <div className="order-parent" key={item._id}>
                    <div className="order-item">
                      <p>
                        <strong>Recipe:</strong> {item.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                    </div>
                    <div>
                      <img
                        src={`http://localhost:9000/${item.image}`}
                        alt={item.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div id="total">
                <strong>Subtotal:</strong> <b>{subtotal}</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
