const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const userController = require("../controller/userController");
const verifyToken = require("../config/auth");

router.post("/create-user", upload, userController.Createuser);
router.post("/create-session", userController.Createsession);
router.get("/protected", verifyToken, userController.Protected);

module.exports = router;
