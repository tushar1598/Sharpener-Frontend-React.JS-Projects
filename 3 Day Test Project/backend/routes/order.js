const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/create-order", orderController.Createorder);
router.get("/fetch-orders", orderController.fetchOrder);
router.put("/update-order-status", orderController.orderStatus)

module.exports = router;
