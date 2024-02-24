const express = require("express");
const app = express();
const message = process.env.MESSAGE || "Hello World!";

app.get("/", (req, res) => {
  res.send(message);
});

app.use("/test", (req, res) => {
  res.send({ message });
});

module.exports = app;
