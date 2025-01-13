const Order = require("../models/order");
const Recipe = require("../models/recipe");

module.exports.Createorder = async function (req, res) {
  try {
    const { userId, items, deliveryAddress, paymentMethod } = req.body;
    const newOrder = await Order.create({
      userId,
      items,
      deliveryAddress,
      paymentMethod,
      status: "Pending",
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};

module.exports.fetchOrder = async function (req, res) {
  const { id } = req.query;
  const orders = await Order.find({ userId: id });
  return res.status(200).json({
    orders,
  });
};

module.exports.orderStatus = async function (req, res) {
  const { id } = req.query;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({ message: "Order status updated.", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status." });
  }
};
