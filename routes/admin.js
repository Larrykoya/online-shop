const Router = require("express").Router();
const path = require("path");

Router.get("/items", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.items.html"));
});
Router.get("/items/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/newItem.html"));
});

module.exports = Router;
