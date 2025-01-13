const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add", cartController.Add);
router.post("/remove", cartController.Remove);
router.get("/fetch-cart", cartController.fetchCart);

module.exports = router;
