const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    image: {
      type: String,
      Required: true,
    },
    imageId: {
      type: String,
      Required: true,
    },
    price: {
      type: Number,
      Required: true,
    },
    alt: {
      type: String,
      default: "product image",
    },
    description: {
      type: String,
      Required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema);

module.exports = Item;
