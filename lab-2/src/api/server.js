const app = require("express")();
const message = process.env.MESSAGE || "Hello World!";

app.get("/", (_req, res) => {
  res.send(message);
});

app.get("/test", (_req, res) => {
  res.send({ message });
});

module.exports = app;
