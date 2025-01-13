const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/recipes", require("./recipe"));
router.use("/cart", require("./cart"));
router.use("/orders", require("./order"));

module.exports = router;
