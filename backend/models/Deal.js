const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: String,
  discount: Number,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Deal", dealSchema);