const path = require("path");
createItem = async (req, res) => {
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
updateItem = (req, res) => {};
deleteItem = async (req, res) => {
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
};

module.exports = {
  createItem,
  fetchAllItems,
  fetchSingleItem,
  updateItem,
  deleteItem,
};
