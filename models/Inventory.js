const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventorySchema = new Schema({
  item: {
    type: String,
    required: [true, "Please enter an item"],
    enum: ["Chair", "Table", "Bed Frame", "Apartment", "Bungalow", "Duplex"]
  },
  state: {
    type: String,
    required: [true, "Please enter state of the item"],
    enum: ["Available", "Unavailable", "Damaged", "In Use"],
  },
  material: {
    type: String,
    enum: ["Wood", "Metal", "2 bedroom", "3 bedroom", "4 bedroom"],
  },
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);
