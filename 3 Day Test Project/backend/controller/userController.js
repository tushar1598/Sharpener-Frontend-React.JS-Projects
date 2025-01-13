const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports.Createuser = async function (req, res) {
  const { restaurantName, country, phoneNumber, email, password } = req.body;
  const Password = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      restaurantName,
      country,
      phoneNumber,
      email,
      password: Password,
    });
    res.status(201).json({ user, message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user data", error });
  }
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

module.exports.Resetpasswordlink = async function (req, res) {
  const { email } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "tsaini425@gmail.com",
        pass: "vmep qnou mvcq uhys",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.sendMail({
      from: user.email,
      to: "tsaini425@gmail.com",
      subject: "Password Reset Link",
      html: `http://localhost:5173/users/reset-password/${user._id}`,
    });
    return res.status(200).json({
      message: "Reset Password Link Sent Successfully!!",
      link: true,
    });
  }
  return res.status(200).json({
    message: "user is not found",
    link: false,
  });
};

module.exports.Resetpassword = async function (req, res) {
  const { id, password } = req.body;
  let Password = await bcrypt.hash(password, 10);
  let reset = await User.findByIdAndUpdate(id, { password: Password });
  return res.status(200).json({
    reset,
  });
};

module.exports.EditProfile = async function (req, res) {
  const { id } = req.query;
  const { restaurantName, country, phoneNumber, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        restaurantName,
        country,
        phoneNumber,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
      },
      { new: true }
    );

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};
