//const {} = require("../controller/items.controller")
const express = require("express");
const Router = express.Router();
const path = require("path");

Router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/items.html"));
});

module.exports = Router;
