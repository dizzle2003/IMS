const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");

/*
@desc = Retrieves all inventory items in the database
@route = '/api/inventory'
@access = private (admin only)
*/
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    return res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};

/*
@desc = Creates an inventory item in the database
@route = '/api/inventory'
@access = private (admin only)
*/
exports.createInventoryItem = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json({
      created: true,
      msg: `${inventory.item} has been created`,
      data: inventory,
    });
  } catch (err) {
    res.status(400).json({
      created: false,
      err,
    });
  }
};

/*
@desc = Update an inventory item in the database
@route = '/api/inventory'
@parameters = id
@access = private (admin only)
*/
exports.updateInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(302).json({
      updated: true,
      msg: `${inventory} with id ${id} has been updated`,
      data: inventory,
    });
  } catch (err) {
    res.status(400).json({
      updated: false,
      err,
    });
  }
};

/*
@desc = Delete an inventory item in the database
@route = '/api/inventory'
@parameters = id
@access = private (admin only)
*/
exports.deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByIdAndDelete(id);
    res.status(200).json({
      msg: `item with ${id} has been deleted`,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
