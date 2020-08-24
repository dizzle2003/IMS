const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getAllRequests,
  getRequestByUser,
  createReplacementRequest,
  createRequest,
} = require("../controllers/request");

router
  .route("/")
  .get(authorize, getAllRequests)
  .get(protect, getRequestByUser)
  .post(protect, createReplacementRequest)
  router.post("/createRequest", authorize, createRequest);

module.exports = router;
