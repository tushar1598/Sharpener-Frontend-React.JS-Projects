const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Createuser = async function (req, res) {
  const { name, email, phone, password } = req.body;
  const avatar = req.file ? req.file.filename : null;
  let alreadyuser = await User.findOne({ email: email });
  let alreadyusernumber = await User.findOne({ phone: phone });

  if (!alreadyuser && !alreadyusernumber) {
    let Password = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      phone,
      password: Password,
      avatar: `/uploads/${avatar}`,
    });

    return res.status(200).json({
      message: "user created",
      user,
    });
  }

  return res.status(200).json({
    message: "user already founded",
    user: null,
  });
};

module.exports.Createsession = async function (req, res) {
  const { email, password } = req.body;
  const userfound = await User.findOne({ email: email });
  if (userfound !== null) {
    let Password = await bcrypt.compare(password, userfound.password);
    if (Password) {
      const Token = jwt.sign(
        { id: userfound._id, email: userfound.email },
        "Tushar@123",
        { expiresIn: "2hr" }
      );
      return res.status(200).json({
        Token,
      });
    } else {
      return res.status(200).json({
        password: false,
      });
    }
  } else {
    return res.status(200).json({
      user: false,
    });
  }
};

module.exports.Protected = function (req, res) {
  return res.status(200).json({
    message: "Authentication Successfull",
    user: req.user,
  });
};
