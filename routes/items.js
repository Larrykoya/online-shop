const Router = require("express").Router();
const JWT = require("jsonwebtoken");

Router.get("/", (req, res) => {
  if (req.session.token) return res.render("admin.items.ejs");
  res.render("items");
});
Router.get("/new", (req, res) => {
  if (req.session.token) {
    const currentUser = JWT.verify(
      req.session.token,
      process.env.JWT_SECRET_KEY
    );
    return res.render("newItem");
  }
  res.redirect(303, "/login");
});
Router.get("/:id", (req, res) => {
  if (req.session.token) return res.render("updateItem");
  res.render("singleItem");
});

module.exports = Router;
