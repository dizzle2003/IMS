const express = require("express");
const {
  getAllInventory,
  createInventoryItem,
} = require("../controllers/inventory");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  /**
   * @swagger
   * /api/inventory:
   *  get:
   *    description: This retrieves all inventory from the database
   *    access: admin only
   *    responses:
   *      '200':
   *        description: A successful response with all items in the inventory
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: string
   *              example:
   *                id: 'id'
   *                item: 'Chair'
   *                state: 'Available'
   *                material: 'Wood'    
   *      '403':
   *        description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *    
   */
  .get(protect, authorize("admin"), getAllInventory)

  /**
   * @swagger
   * /api/inventory:
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
  .post(protect, authorize("admin"), createInventoryItem);

module.exports = router;
