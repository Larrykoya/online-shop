const Router = require("express").Router();
const path = require("path");
const JWT = require("jsonwebtoken");

Router.get("/", (req, res) => {
  if (req.session.token)
    return res.sendFile(path.join(__dirname, "../views/admin.items.html"));
  res.sendFile(path.join(__dirname, "../views/items.html"));
});
Router.get("/new", (req, res) => {
  if (req.session.token) {
    const currentUser = JWT.verify(
      req.session.token,
      process.env.JWT_SECRET_KEY
    );
    return res.sendFile(path.join(__dirname, "../views/newItem.html"));
  }
  res.redirect(303, "/login");
});
Router.get("/:id", (req, res) => {
  if (req.session.token)
    return res.sendFile(path.join(__dirname, "../views/updateItem.html"));
  res.redirect(303, "/items");
});

module.exports = Router;
