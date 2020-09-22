const mongoose = require("mongoose");
const Property = require("../models/Property");

exports.getAllProperty = async (req, res) => {
  try {
    const property = Property.find();
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "Error retrieving property from database",
    });
  }
};

/*
@desc = Updates a request by the user in the database
@route = PATCH '/api/requests'
@access = public (admin only)
*/
exports.updatePropertyStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    try {
      const property = Property.findByIdAndUpdate(id, status, {
        new: true,
        runValidators: true,
      });
  
      res.status(302).json({
        updated: true,
        msg: `${property} with id ${id} has been updated`,
        data: property.status
      });
    } catch (err) {
      res.status(400).json({
        updated: false,
        err,
      });
    }
  };

  /*
@desc = Creates a request by the user in the database
@route = POST '/api/property'
@access = protected (logged in user only)
*/
exports.createProperty = async (req, res) => {
    //Add User to req.body
    req.body.user = req.user;
    try {
      const property = await Property.create(req.body);
      res.json(201).json({
        success: true,
        data: property,
      });
    } catch (err) {
      res.json(400).json({
        success: false,
        err,
      });
    }
  };
  

