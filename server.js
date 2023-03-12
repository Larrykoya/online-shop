const express = require("express");
const server = express();
const cors = require("cors");
const home = require("./routes/index");
const items = require("./routes/items");
const cart = require("./routes/cart");
const contact = require("./routes/contact");
const stripe = require("./routes/stripe");
const success = require("./routes/success");
const PORT = process.env.PORT || 8080;
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
