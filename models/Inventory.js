const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventorySchema = new Schema({
  item: {
    type: [String],
    required: [true, "Please enter an item"],
    enum: ["Chair", "Table", "Bed Frame"],
  },
  state: {
    type: [String],
    required: [true, "Please enter state of the item"],
    enum: ["Available", "Unavailable", "Damaged", "In Use"],
  },
  material: {
    type: [String],
    enum: ["Wood", "Metal"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);
