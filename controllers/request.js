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
@desc = Creates a replacement request by the user in the database
@route = POST '/api/requests'
@access = protected (logged in user only)
*/
exports.createReplacementRequest = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      msg: "Please upload a photo of the item to be replaced",
    });
  }
  //Check If upload is an image
  if (!req.files.file.mimetype.startsWith("image")) {
    return res.status(400).json({
      err: "This is not an image, please upload an image",
    });
  }
  //Limit size of photo upload file
  if (req.files.file > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      err: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }
  //Create custom filename
  // @ts-ignore
  req.files.file.name = `photo_${Inventory._item}${path.parse(file.name).ext}`;

  req.files.file.mv(
    `${process.env.FILE_UPLOAD_PATH}/${req.files.file.name}`,
    async (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          success: false,
          err,
        });
      }
    }
  );

  try {
    //Add User to req.body
    req.body.user = req.user;
    req.body.file = req.files.file;
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

/*
@desc = Updates a request by the user in the database
@route = PATCH '/api/requests'
@access = public (admin only)
*/
exports.updatePropertyStatus = async (req, res) => {
  const { id } = req.params;
  req.body.user = req.user
  try {
    const property = Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(302).json({
      updated: true,
      msg: `${property} with id ${id} has been updated`,
      data: property
    });
  } catch (err) {
    res.status(400).json({
      updated: false,
      err,
    });
  }
};
