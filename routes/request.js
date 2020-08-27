const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getAllRequests,
  createReplacementRequest,
  createRequest
} = require("../controllers/request");

router.route("/")
  .get(protect, authorize("admin"), getAllRequests)
  .post(protect, createReplacementRequest);

router.post("/createrequest", authorize, createRequest);

module.exports = router;
