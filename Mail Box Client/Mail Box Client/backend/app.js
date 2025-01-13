const express = require("express");
const port = 9000;
const app = express();
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/mongoose");
const Email = require("./models/email");

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/", require("./routes"));

io.on("connection", (socket) => {
  socket.on("send-email", async (emailData) => {
    socket.broadcast.emit("send-email", emailData);
    try {
      const email = await Email.create({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.body,
        isRead: false,
      });
      io.emit("new-inbox-email", email);
    } catch (error) {
      console.error("Error storing email in the database:", error);
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is Running Successfully on Port:: ${port}!!`);
});
