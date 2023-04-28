const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const Router = express.Router();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Item = require("../model/items.model");
const Admin = require("../model/admins.model");
const {
  validateSignup,
  validateLogin,
} = require("../controller/middleware/validator/admin.validator");
express().use(express.urlencoded({ extended: true }));
express().use(express.json());
require("dotenv").config();

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

Router.post("/items", upload.single("productImage"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const image = await cloudinary.uploader.upload(imagePath);
    const { name, price, description, alt } = req.body;
    const newProduct = await Item.create({
      name,
      price,
      description,
      image: image.url,
      imageId: image.public_id,
      alt,
    });
    res.redirect(303, "/items/admin");
    fs.unlinkSync(imagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add product" });
  }
});

Router.get("/items", async (req, res) => {
  try {
    const products = await Item.find({});
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to process request",
    });
  }
});

Router.delete("/items", async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Item.findByIdAndDelete(id);
    await cloudinary.uploader.destroy(product.imageId);
    res.status(201).json({
      message: "delete successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to process request",
    });
  }
});

Router.post("/admins", validateSignup, async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json({
      Message: "Admin created",
      admin,
    });
  } catch (error) {}
});

Router.post("/stripe/create-checkout-session", async (req, res) => {
  try {
    const line_items = req.body.map((cartItem) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${cartItem.name}`,
          },
          unit_amount: `${cartItem.price * 100}`,
        },
        quantity: `${cartItem.quantity}`,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cart`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to process request",
    });
  }
});

module.exports = Router;
