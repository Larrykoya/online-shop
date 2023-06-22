const Router = require("express").Router();

Router.route("/").get((req, res) => {
  res.render("success");
});

module.exports = Router;
