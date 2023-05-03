const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const home = require("./routes/index");
const items = require("./routes/items");
const cart = require("./routes/cart");
const contact = require("./routes/contact");
const api = require("./routes/api");
const login = require("./routes/login");
const signup = require("./routes/signup");
const success = require("./routes/success");
const PORT = process.env.PORT;
const db = () => mongoose.connect(process.env.LOCAL_MONGO_DB);

db()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Unable to connect to DB", err));

server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, //10mins
  })
);

server.use("/", home);
server.use("/api", api);
server.use("/cart", cart);
server.use("/login", login);
server.use("/signup", signup);
server.use("/items", items);
server.use("/contact", contact);
server.use("/success", success);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
