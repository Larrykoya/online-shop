const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const home = require("./routes/index");
const items = require("./routes/items");
const cart = require("./routes/cart");
const contact = require("./routes/contact");
const stripe = require("./routes/stripe");
const success = require("./routes/success");
const PORT = process.env.PORT;

const db = () => mongoose.connect(process.env.MONGO_URI);
db()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Unable to connect to DB", err));

server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use("/", home);
server.use("/items", items);
server.use("/cart", cart);
server.use("/contact", contact);
server.use("/api/stripe", stripe);
server.use("/success", success);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
