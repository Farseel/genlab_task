const Deal = require("../models/Deal");

// GET ALL DEALS
exports.getDeals = async (req, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

// ADD DEAL
exports.addDeal = async (req, res) => {
  const deal = new Deal(req.body);
  await deal.save();
  res.json(deal);
};

// DELETE DEAL
exports.deleteDeal = async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE DEAL (EDIT + TOGGLE)
exports.updateDeal = async (req, res) => {
  const updated = await Deal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};