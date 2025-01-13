const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    isRead: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    senderDeleted: {
      type: Boolean,
      default: false,
    },
    recipientDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
