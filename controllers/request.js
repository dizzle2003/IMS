const path = require("path");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const Inventory = require("../models/Inventory");

/*
@desc = Views all requests created by users in the database
@route = GET '/api/requests'
@access = private (admin only)
*/
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};

/*
@desc = Creates a request by the user in the database
@route = POST '/api/requests'
@access = protected (logged in user only)
*/
exports.createRequest = async (req, res) => {
  //Add User to req.body
  req.body.user = req.user;
  try {
    const userRequest = await Request.create(req.body);
    res.json(201).json({
      success: true,
      data: userRequest,
    });
  } catch (err) {
    res.json(400).json({
      success: false,
      err,
    });
  }
};

/*
@desc = Creates a request by the user in the database
@route = POST '/api/requests'
@access = protected (logged in user only)
*/
// exports.createPropertyRequest = async (req, res) => {
//   //Add User to req.body
//   req.body.user = req.user.id;
//   try {
//     const userRequest = await Request.create(req.body);
//     res.json(201).json({
//       success: true,
//       data: userRequest,
//     });
//   } catch (err) {
//     res.json(400).json({
//       success: false,
//       err,
//     });
//   }
// };
/*

/*
@desc = Updates a request by the user in the database
@route = PATCH '/api/requests'
@access = public (admin only)
*/
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body
  try {
    const request = Request.findByIdAndUpdate(id, status, {
      new: true,
      runValidators: true,
    });

    res.status(302).json({
      updated: true,
      msg: `${request} with id ${id} has been updated`,
      data: request.status
    });
  } catch (err) {
    res.status(400).json({
      updated: false,
      err,
    });
  }
};
