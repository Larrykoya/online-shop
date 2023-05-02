const Item = require("../model/items.model");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

createItem = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    req.body.image = image.url;
    req.body.imageId = image.public_id;
    const newProduct = await Item.create(req.body);
    res.redirect(303, "/items");
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add product" });
  }
};
fetchAllItems = async (req, res) => {
  try {
    const products = await Item.find({});
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "unable to process request",
    });
  }
};
fetchSingleItem = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Item.findById(id);
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const item = await Item.findById(id);
      await cloudinary.uploader.destroy(item.imageId);
      const image = await cloudinary.uploader.upload(req.file.path);
      req.body.image = image.url;
      req.body.imageId = image.public_id;
      fs.unlinkSync(req.file.path);
    }
    await Item.findByIdAndUpdate(id, req.body);
    res.redirect(303, "/items");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
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
};

module.exports = {
  createItem,
  fetchAllItems,
  fetchSingleItem,
  updateItem,
  deleteItem,
};
