const Cart = require("../models/Cart");

// GET CART
exports.getCart = async (req, res) => {
  const cart = await Cart.find().populate("productId");
  res.json(cart);
};

// ADD TO CART (FIXED)
exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  const existing = await Cart.findOne({ productId });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.json(existing);
  }

  const item = new Cart({ productId, quantity: 1 });
  await item.save();
  res.json(item);
};

// UPDATE QUANTITY
exports.updateCart = async (req, res) => {
  const { quantity } = req.body;

  const updated = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true }
  );

  res.json(updated);
};

// DELETE ITEM
exports.deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};