const express = require("express");
const { getUsers, login, logout} = require("../controllers/user");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.route('/')
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
   */
  .get(protect, authorize("admin"), getUsers)
/**
   * @swagger
   * paths:
   *  /api/users:
   *    post:
   *      summary: This logs a user to the application
   *      requestBody:
   *        description: JSON body to be passed to the endpoint
   *        required: true
   *        content: 
   *          application/json:
   *            schema:
   *              $ref: '../models/Users'
   *            example:
   *              {
   *                 "email": "admin.one@covenantuniversity.edu.ng",
   *                  "password": "adminone"
   *              }
   *      access: admin only
   *      responses:
   *        '201':
   *          description: A successful response with the created item
   *        '403':
   *          description: An unauthorized request suggesting logged in user does not have corresponding rights
   *        '500':
   *          description: Internal Server Error suggesting server maybe experiencing faults
   * definitions:
   *  User:
   *    type: object
   *    required:
   *      - email
   *      - password
   *    properties:
   *      email:
   *        type: string
   *      password:
   *        type: string
   *  
   */
  .post(login)
  /**
   * @swagger
   * paths:
   *  /api/users/logout:
   *    get:
   *      description: This logs out all users and deletes the cookies
   *      access: logged in user or admin
   *      responses:
   *        '200':
   *          description: A successful response with cleared cookies
   *        '500':
   *         description: An internal server error
   */
  
  router.get('/logout', logout)
  

module.exports = router;

