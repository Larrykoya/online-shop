const Router = require("express").Router();
const path = require("path");

Router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = Router;
