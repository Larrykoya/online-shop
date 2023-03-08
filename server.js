const express = require("express");
const server = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
