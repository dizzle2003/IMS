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
   /**
   * @swagger
   * /api/property:
   *  get:
   *    summary: This retrieves all properties from the database
   *    access: admin only
   *    responses:
   *      '200':
   *        description: A successful response with all items in the property collection
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: string
   *              example:
   *                id: 'id'
   *                property: 'Apartment'
   *                status: 'closed'    
   *      '403':
   *        description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *    
   */
  .get(protect, authorize("admin"), getAllProperty)
   /**
   * @swagger
   * paths:
   *  /api/property:
   *    put:
   *      summary: This allows an admin to update the status of a property on the application
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content: 
   *          application/json:
   *            schema:
   *              $ref: '../models/property'
   *            example:
   *              status: 'closed'
   *      access: admin only
   *      responses:
   *        '201':
   *          description: A successful response with the created item
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults
   * definitions:
   *  Property:
   *    type: object
   *    required:
   *      - status
   *    properties:
   *      status:
   *        type; string
   */
  .put(protect, authorize("admin"), updatePropertyStatus)
  /**
   * @swagger
   * paths:
   *  /api/property:
   *    post:
   *      summary: This allows a user to create a property on the application
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content: 
   *          application/json:
   *            schema:
   *              $ref: '../models/property'
   *            example:
   *              type: 'Apartment'
   *              kind: '2br'
   *              position: 'Faculty Member'
   *              status: 'pending'
   *      access: user only
   *      responses:
   *        '201':
   *          description: A successful response with the updated item
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults
   * definitions:
   *  Property:
   *    type: object
   *    required:
   *      - type
   *      - kind
   *      - position
   *      - status
   *    properties:
   *      type:
   *        type: string
   *      kind:
   *        type: string
   *      position:
   *        type: string
   *      status:
   *        type; string
   */
  .post(protect, authorize("user"), createProperty);

module.exports = router;
