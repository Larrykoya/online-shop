const Router = require("express").Router();
const path = require("path");

Router.get("/", (req, res) => {
  if (req.query.admin === "true") {
    res.sendFile(path.join(__dirname, "../views/admin.items.html"));
  }
  res.sendFile(path.join(__dirname, "../views/items.html"));
});
Router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/newItem.html"));
});

module.exports = Router;
