const Router = require("express").Router();

Router.route("/").get((req, res) => {
  res.render("cart");
});

module.exports = Router;
