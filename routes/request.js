const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getAllRequests,
  createRequest,
  updateStatus,
} = require("../controllers/request");

router
  .route("/")
  .get(protect, authorize("user"), createRequest)
  .get(protect, authorize("admin"), getAllRequests)
  .put(protect, authorize("admin"), updateStatus);

module.exports = router;
