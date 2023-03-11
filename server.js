const express = require("express");
const server = express();
const home = require("./routes/index");
const items = require("./routes/items");
const cart = require("./routes/cart");
const contact = require("./routes/contact");
const PORT = process.env.PORT || 8080;
//require("dotenv").config;
server.use(express.static("public"));

server.use("/", home);
server.use("/items", items);
server.use("/cart", cart);
server.use("/contact", contact);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
