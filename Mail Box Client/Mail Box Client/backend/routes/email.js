const express = require("express");
const router = express.Router();
const emailController = require("../controller/emailController");

router.get("/fetch-inbox-email", emailController.FetchInboxEmails);
router.get("/fetch-sent-email", emailController.FetchSentEmails);
router.put("/mark-as-read/:id", emailController.MarkAsRead);
router.put("/delete-inbox/:id", emailController.DeleteInboxEmail);
router.put("/delete-sent-box/:id", emailController.DeleteSentBoxEmail);


module.exports = router;
