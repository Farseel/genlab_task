require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/deals", require("./routes/dealRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// Admin Report
app.get("/api/admin/report", async (req, res) => {
  const Product = require("./models/Product");
  const Deal = require("./models/Deal");
  const Cart = require("./models/Cart");

  const totalProducts = await Product.countDocuments();
  const totalDeals = await Deal.countDocuments({ active: true });
  // Sum the quantities of items in cart to get total items (respect quantity > 1)
  const agg = await Cart.aggregate([
    { $group: { _id: null, total: { $sum: "$quantity" } } }
  ]);
  const totalCartItems = (agg[0] && agg[0].total) ? agg[0].total : 0;

  res.json({ totalProducts, totalDeals, totalCartItems });
});

app.listen(PORT, () => console.log("Server running on port 5000"));