const express = require("express");
const port = 9000;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/mongoose");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running successfully on port:: ${port}!!`);
});
