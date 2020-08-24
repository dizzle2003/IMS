const express = require("express");
const {
  getAllInventory,
  createInventoryItem
} = require("../controllers/inventory");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin"), getAllInventory)
  .post(protect, authorize("admin"), createInventoryItem);

module.exports = router;
