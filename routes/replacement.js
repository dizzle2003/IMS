const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  createReplacement,
  getAllReplacement,
  updateStatus,
} = require("../controllers/replacement");

router
  .route("/")
  /**
   * @swagger
   * paths:
   *  /api/request:
   *  get:
   *    description: This retrieves all replacement request objects from the database
   *    access: admin only
   *    responses:
   *      '200':
   *        description: A successful response with all replacement requests
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
   *      '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults 
   */
  .get(protect, authorize("admin"), getAllReplacement)
  /**
   * @swagger
   * paths:
   *  /api/replacement:
   *    post:
   *      summary: This allows a user to create a replacement request on the application
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content: 
   *          application/json:
   *            schema:
   *              $ref: '../models/replacement'
   *            example:
   *              location: '75, Hartley Avenue'
   *              photo: 'ajax.jpg'
   *              description: 'Broken and needs to be replaced'
   *              status: 'pending'
   *      access: user only
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
   *      - location
   *      - description
   *    properties:
   *      location:
   *        type: string
   *      description:
   *        type: string
   *      photo:
   *        type: string
   */
  .post(protect, authorize("user"), createReplacement)
  /**
   * @swagger
   * paths:
   *  /api/replacement:
   *    put:
   *      summary: This allows an admin to update the status of a replacement request on the application
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content: 
   *          application/json:
   *            schema:
   *              $ref: '../models/Replacement'
   *            example:
   *              status: 'closed'
   *      access: admin only
   *      responses:
   *        '201':
   *          description: A successful response with the updated request status
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
  .put(protect, authorize("admin"), updateStatus);

module.exports = router;
