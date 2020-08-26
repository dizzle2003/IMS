const express = require("express");
const { getUsers, login, logout} = require("../controllers/user");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
 /**
   * @swagger
   * /api/users:
   *  get:
   *    description: This retrieves all users from the database
   *    access: admin only
   *    responses:
   *      '200':
   *        description: A successful response with all users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: string
   *      '403':
   *        description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *    
   */
  .get('/', protect, authorize("admin"), getUsers)
/**
   * @swagger
   * /api/users:
   *  post:
   *    summary: This creates an item in the inventory
   *    requestBody:
   *      description: JSON body to be passed to the endpoint
   *      required: true
   *      content: 
   *        application/json:
   *          schema:
   *            $ref: '../models/inventory'
   *          example:
   *            item: 'Chair'
   *            state: 'Available'
   *            material: 'Wood'
   *    access: admin only
   *    responses:
   *      '201':
   *        description: A successful response with the created item
   *      '403':
   *        description: An unauthorized request suggesting logged in user does not have corresponding rights
   *      '500':
   *        description: Internal Server Error suggesting server maybe experiencing faults
   */
  .post('/login', login)
  .get('/logout', logout)
  

module.exports = router;
