import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditOrderStatus = () => {
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:9000/orders/update-order-status/?id=${orderId}`,
        {
          status: newStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (orders.length === 0) {
    return <h2>No orders found!</h2>;
  }

  return (
    <div className="order-status-container">
      <h1>Manage Orders</h1>
      <div className="order-cards">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>
              <strong>Customer Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Delivery Address:</strong> {order.deliveryAddress}
            </p>
            <p>
              <strong>Total Price:</strong> {order.totalPrice}
            </p>
            <div className="order-actions">
              <button
                onClick={() => updateOrderStatus(order._id, "delivered")}
                disabled={order.status === "delivered"}
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => updateOrderStatus(order._id, "failed")}
                disabled={order.status === "failed"}
              >
                Mark as Failed
              </button>
            </div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditOrderStatus;
