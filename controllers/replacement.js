const mongoose = require("mongoose");
const path = require("path");
const replacement = require("../models/Replacement");

/*
@desc = Creates a replacement request by the user in the database
@route = POST '/api/replacements'
@access = protected (logged in user only)
*/
exports.createReplacement = async (req, res) => {
  try {
    //Add User to req.body
    req.body.user = req.user;
    req.body.file = req.files.file;

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
    req.files.file.name = `photo_${replacement._item}${
      // @ts-ignore
      path.parse(file.name).ext
    }`;

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
    const userRequest = await replacement.create(req.body);
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

exports.updateStatus = async (req, res) => {
  try {
    //Grab ID from property
    const { id } = req.params;
    const { status } = req.body;
    const updatedStatus = await replacement.findByIdAndUpdate(id, status, {
      new: true,
      runValidators: true,
    });

    res.status(302).json({
      updated: true,
      msg: `status has been updated`,
      data: updatedStatus,
    });
  } catch (err) {
    res.status(400).json({
      updated: false,
      err,
    });
  }
};

exports.getAllReplacement = async (req, res) => {
  try {
    const allreplacementrequests = await replacement.find();
    res.status(200).json({
      success: true,
      data: allreplacementrequests,
    });
  } catch (err) {
      res.status(400).json({
          success: false,
          msg: "error retrieving requests from database"
      })
  }
};
