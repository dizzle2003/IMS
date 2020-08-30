const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  createReplacement,
  getAllReplacement,
  updateStatus,
} = require("../controllers/replacement");

router
  .route("/")
  .get(protect, authorize("admin"), getAllReplacement)
  .post(protect, authorize("user"), createReplacement)
  .put(protect, authorize("admin"), updateStatus);

module.exports = router;
