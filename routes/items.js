//const {} = require("../controller/items.controller")
const express = require("express");
const Router = express.Router();
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Item = require("../model/items.model");
express().use(express.urlencoded({ extended: true }));
express().use(express.json());

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

const upload = multer({ storage });

Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/items.html"));
});

Router.post("/", upload.single("productImage"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const image = await cloudinary.uploader.upload(imagePath);
    // const { name, price, description, alt } = req.body;
    // const newProduct = await Item.create({
    //   name,
    //   price,
    //   description,
    //   image: image.url,
    //   alt,
    // });
    // res.redirect(303, "/items");
    fs.unlinkSync(imagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add product" });
  }
});

Router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/newItem.html"));
});

module.exports = Router;
