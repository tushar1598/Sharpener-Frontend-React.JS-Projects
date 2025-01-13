const Email = require("../models/email");

module.exports.FetchInboxEmails = async function (req, res) {
  const { email } = req.query;
  const emails = await Email.find({ to: email, recipientDeleted: false });
  return res.status(200).json({
    emails,
  });
};

module.exports.FetchSentEmails = async function (req, res) {
  const { email } = req.query;
  const emails = await Email.find({ from: email, senderDeleted: false });
  return res.status(200).json({
    emails,
  });
};

module.exports.MarkAsRead = async function (req, res) {
  try {
    const { id } = req.params;
    const updatedEmail = await Email.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res
      .status(200)
      .json({ message: "Email marked as read", email: updatedEmail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.DeleteInboxEmail = async function (req, res) {
  const emailId = req.params.id;
  try {
    await Email.findByIdAndUpdate(emailId, { recipientDeleted: true });
    res.status(200).json({ message: "Email deleted from inbox." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete email.", error: err });
  }
};

module.exports.DeleteSentBoxEmail = async function (req, res) {
  const emailId = req.params.id;
  try {
    await Email.findByIdAndUpdate(emailId, { senderDeleted: true });
    res.status(200).json({ message: "Email deleted from sent box." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete email.", error: err });
  }
};
