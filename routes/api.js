const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const Router = express.Router();
const multer = require("multer");
const {
  createItem,
  fetchAllItems,
  fetchSingleItem,
  updateItem,
  deleteItem,
} = require("../controller/items.controller");
const {
  validateSignup,
  validateLogin,
  validateAdminUpdate,
} = require("../controller/middleware/validator/auth.validator");
const {
  adminSignupController,
  adminLoginController,
  updateAdminController,
} = require("../controller/auth.controller");
const {
  fetchAllAdmin,
  fetchSingleAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");

express().use(express.urlencoded({ extended: true }));
express().use(express.json());
require("dotenv").config();

const storage = multer.diskStorage({
  destination: "tmp",
  filename: function (req, file, cb) {
    let date = new Date().toISOString().substring(0, 10);
    cb(null, date + "-" + file.originalname);
  },
});

const upload = multer({ storage });

Router.post("/items", upload.single("productImage"), createItem);

// Router.put("/items", upload.single("productImage"), async (req, res) => {
//   try {
//     const imagePath = req.file.path;
//     const image = await cloudinary.uploader.upload(imagePath);
//     const { name, price, description, alt } = req.body;
//     const newProduct = await Item.create({
//       name,
//       price,
//       description,
//       image: image.url,
//       imageId: image.public_id,
//       alt,
//     });
//     res.redirect(303, "/items/admin");
//     fs.unlinkSync(imagePath);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

Router.get("/items", fetchAllItems);
Router.get("/items/:id", fetchSingleItem);

Router.delete("/items", deleteItem);

Router.post("/admin/signup", validateSignup, adminSignupController);
Router.post("/admin/login", validateLogin, adminLoginController);
Router.get("/admin", fetchAllAdmin);
Router.get("/admin/:id", fetchSingleAdmin);
Router.put("/admin/:id", validateAdminUpdate, updateAdminController);
Router.delete("/admin/:id", deleteAdmin);
Router.post("/logout", (req, res) => {
  console.log("user logged out");
  req.session.destroy();
  res.status(201).json({ Message: "logout success" });
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
