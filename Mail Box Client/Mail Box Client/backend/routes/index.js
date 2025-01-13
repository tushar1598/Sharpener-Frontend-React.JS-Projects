const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/emails", require("./email"));

module.exports = router;
