const Router = require("express").Router();
const path = require("path");

Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = Router;
