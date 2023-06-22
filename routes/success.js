const Router = require("express").Router();

Router.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/success.html"));
});

module.exports = Router;
