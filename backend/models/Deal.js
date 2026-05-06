const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: String,
  discount: Number,
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Deal", dealSchema);