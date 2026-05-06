const express = require("express");
const router = express.Router();
const {
  getDeals,
  addDeal,
  deleteDeal,
  updateDeal
} = require("../controllers/dealController");

router.get("/", getDeals);
router.post("/", addDeal);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);

module.exports = router;