const express = require("express");
const { getUsers, login, logout} = require("../controllers/user");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .get('/', protect, authorize("admin"), getUsers)
  .post('/login', login)
  .get('/logout', logout)
  

module.exports = router;
