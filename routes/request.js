const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getAllRequests,
  createReplacementRequest,
  createRequest,
  updatePropertyStatus,
} = require("../controllers/request");

router
  .route("/")
  .get(protect, authorize("admin"), getAllRequests)
  .put(protect, authorize("user"), updatePropertyStatus);

router.post("/createrequest", protect, authorize("user"), createRequest);
router.post(
  "/createreplacementrequest",
  protect,
  authorize("user"),
  createReplacementRequest
);

module.exports = router;
