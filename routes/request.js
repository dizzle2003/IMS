const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getAllRequests,
  createReplacementRequest,
  createRequest,
} = require("../controllers/request");

router
  .route("/")
  .get(authorize, getAllRequests)
  .post(protect, createReplacementRequest);

router.post("/createRequest", authorize, createRequest);

module.exports = router;
