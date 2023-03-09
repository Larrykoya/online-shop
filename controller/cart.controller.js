const cart = null;

module.exports = createCart = (req, res) => {};

module.exports = getCart = (req, res) => {
  try {
    if (cart == null) {
      return res.status(404).send("cart empty");
    }
    res.status(200).json({ cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error processing request",
    });
  }
};
