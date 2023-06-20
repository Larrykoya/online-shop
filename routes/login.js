const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = Router;
