const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
  getAllProperty,
  updatePropertyStatus,
  createProperty,
} = require("../controllers/property");

router
  .route("/")
  .get(protect, authorize("admin"), getAllProperty)
  .put(protect, authorize("admin"), updatePropertyStatus)
  .post(protect, authorize("user"), createProperty);

module.exports = router;
