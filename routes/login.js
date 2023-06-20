const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.render("login");
});

module.exports = Router;
