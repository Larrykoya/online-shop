const Router = require("express").Router();

Router.route("/").get((req, res) => {
  res.render("contact");
});

module.exports = Router;
