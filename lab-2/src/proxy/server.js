const app = require("express")();
const axios = require("axios");

const host = process.env.HOST || "http://localhost";
const port = process.env.API_PORT || 3000;

app.get("/", (_req, res) => {
  axios.get(`${host}:${port}`).then((response) => {
    res.send(response.data);
  });
});

app.get("/test", (_req, res) => {
  axios.get(`${host}:${port}/test`).then((response) => {
    res.send(response.data);
  });
});

module.exports = app;
