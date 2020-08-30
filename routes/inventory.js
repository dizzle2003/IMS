const express = require("express");
const {
  getAllInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../controllers/inventory");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  /**
   * @swagger
   * paths:
   *  /api/inventory:
   *    get:
   *      description: This retrieves all inventory from the database
   *      access: admin only
   *      responses:
   *        '200':
   *          description: A successful response with all items in the inventory
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  type: string
   *                example:
   *                  id: 'id'
   *                  item: 'Chair'
   *                  state: 'Available'
   *                  material: 'Wood'
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *          content:
   *            application/json:
   *              schema:
   *                type: string
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
   *            $ref: '#/models/Inventory'
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
  .post(protect, authorize("admin"), createInventoryItem)
  /**
   * @swagger
   * paths:
   *  /api/replacement:
   *    put:
   *      summary: This allows an admin to update the status of items in the inventory
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/models/Inventory'
   *            example:
   *              status: 'closed'
   *      access: admin only
   *      responses:
   *        '201':
   *          description: A successful response with the updated Inventory Item
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults
   * definitions:
   *  Request:
   *    type: object
   *    required:
   *      - status
   *    properties:
   *      status:
   *        type; string
   */
  .put(protect, authorize("admin"), updateInventoryItem)
  /**
   * @swagger
   * paths:
   *  /api/replacement:
   *    put:
   *      summary: This allows an admin to delete an inventory item
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/models/Inventory'
   *            example:
   *              id: 5f30948610064f4a000b7139
   *      access: admin only
   *      responses:
   *        '201':
   *          description: A successful response with the corresponding message
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults
   * definitions:
   *  Request:
   *    type: object
   *    required:
   *      - id
   *    properties:
   *      id:
   *        type; string
   */
  .delete(protect, authorize("admin"), deleteInventoryItem);

module.exports = router;
