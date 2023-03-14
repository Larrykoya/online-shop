//const {} = require("../controller/items.controller")
const express = require("express");
const Router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: "tmp",
  filename: function (req, file, cb) {
    let date = new Date().toISOString().substring(0, 10);
    cb(null, date + "-" + file.originalname);
  },
});

Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/items.html"));
});
Router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/newItem.html"));
});

module.exports = Router;
