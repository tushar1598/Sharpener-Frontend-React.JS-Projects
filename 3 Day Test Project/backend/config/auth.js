const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "Tushar@123", function (err, user) {
      if (err) {
        return res.send("<h2>You are not Authenticated!!</h2>");
      }
      User.findOne({ _id: user.id })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => console.log(err));
    });
  } else {
    return res.send("<h2>Something Went Wrong!!</h2>");
  }
};

module.exports = verifyToken;
